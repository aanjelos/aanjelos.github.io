// Kaasi Landing Page - script.js (v3 - Patched)

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Handles the glassmorphism effect on the header when scrolling.
     */
    const setupHeaderScroll = () => {
        const header = document.getElementById('header');
        if (!header) return;

        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
    };

    /**
     * Adds a glowing effect that follows the mouse on bento grid cards.
     */
    const setupBentoGlow = () => {
        const bentoCards = document.querySelectorAll('.bento-card');
        bentoCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };

    /**
     * Sets up a fallback for scroll animations using IntersectionObserver
     * for browsers that don't support CSS scroll-driven animations.
     */
    const setupScrollAnimationFallback = () => {
        const supportsScrollTimeline = window.CSS && CSS.supports('animation-timeline', 'view()');
        if (supportsScrollTimeline) return;

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    };

    /**
     * Initializes the subtle Three.js "flow field" background animation.
     */
    const initFlowFieldBackground = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas || typeof THREE === 'undefined') {
            if(typeof THREE === 'undefined') console.warn('Three.js library not found. Animated background will not be rendered.');
            return;
        }

        let scene, camera, renderer, lines, clock;
        const lineCount = 5;
        const pointsPerLine = 400;

        scene = new THREE.Scene();
        clock = new THREE.Clock();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const createLines = () => {
            const material = new THREE.LineBasicMaterial({ 
                color: 0x2a2a2a,
                transparent: true,
                opacity: 0.6 
            });
            const group = new THREE.Group();
            for (let j = 0; j < lineCount; j++) {
                const points = [];
                for (let i = 0; i < pointsPerLine; i++) {
                    points.push(new THREE.Vector3((i / pointsPerLine - 0.5) * 20, 0, 0));
                }
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, material);
                line.position.y = (Math.random() - 0.5) * 10;
                group.add(line);
            }
            return group;
        };
        
        lines = createLines();
        scene.add(lines);

        const animate = () => {
            requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            lines.children.forEach((line, lineIndex) => {
                const positions = line.geometry.attributes.position.array;
                for (let i = 0; i < pointsPerLine; i++) {
                    const i3 = i * 3;
                    positions[i3 + 1] = Math.sin(positions[i3] * 0.5 + t + lineIndex * 2.0) * 0.5;
                    positions[i3 + 2] = Math.cos(positions[i3] * 0.5 + t + lineIndex * 2.0) * 0.5;
                }
                line.geometry.attributes.position.needsUpdate = true;
            });
            renderer.render(scene, camera);
        };
        animate();

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', onWindowResize, { passive: true });
    };
    
    // --- BLOG POPULATION LOGIC ---
    // This is the corrected and more robust logic.
    const runBlogLogic = () => {
        // First, check if the blog data is available.
        if (typeof blogPosts === 'undefined' || !Array.isArray(blogPosts) || blogPosts.length === 0) {
            console.warn('Blog data is missing or empty. Cannot populate blog sections.');
            return;
        }

        // Helper function to format dates
        const formatBlogDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
        };

        // Helper function to create the HTML for a single post card
        const createPostCard = (post) => {
            return `
                <a href="${post.url}" class="blog-card">
                    <img src="${post.image}" alt="${post.image_alt || 'Blog post image'}" class="blog-card-image" onerror="this.onerror=null; this.src='https://placehold.co/600x400/18181b/3f3f46?text=Image+Not+Found';">
                    <div class="p-6 flex flex-col flex-grow">
                        <span class="blog-card-date">${formatBlogDate(post.date)}</span>
                        <h3 class="blog-card-title">${post.title}</h3>
                        <p class="blog-card-excerpt mt-auto">${post.excerpt}</p>
                    </div>
                </a>
            `;
        };

        // Populate recent posts on the main page
        const recentPostsContainer = document.getElementById('recent-posts-container');
        if (recentPostsContainer) {
            const recentPosts = blogPosts.slice(0, 3);
            recentPostsContainer.innerHTML = recentPosts.map((post, index) => createPostCard(post, index * 0.1)).join('');
        }

        // Populate all posts on the blog page
        const allPostsContainer = document.getElementById('all-posts-container');
        if (allPostsContainer) {
            allPostsContainer.innerHTML = blogPosts.map((post, index) => createPostCard(post, (index % 3) * 0.1)).join('');
        }
    };

    // --- INITIALIZE ALL SCRIPTS ---
    setupHeaderScroll();
    setupBentoGlow();
    setupScrollAnimationFallback();
    initFlowFieldBackground();
    runBlogLogic(); // Run the corrected blog logic

});
