// =================================================================
// K A A S I   B L O G   D A T A
// =================================================================
// This is the single source of truth for all your blog posts.
// To add a new post:
// 1. Create your new post's HTML file in the /blogs/ directory.
// 2. Add a new object to the TOP of this `blogPosts` array.
//
// The script will automatically handle the rest.
// The `id` should be unique for each post.
// The `date` should be in 'YYYY-MM-DD' format for correct sorting.
// =================================================================

const blogPosts = [
    {
    id: "the-story-of-kaasi",
    title: "From a Spreadsheet to an App: The Story Behind Kaasi",
    date: "2025-07-01",
    author: "Aanjelo Salgado",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    image_alt: "A piggy bank with coins.",
    url: "blog/the-story-of-kaasi.html",
    excerpt:
      "Discover the origin story of Kaasi, a personal finance app built for Sri Lankans out of a personal need for something better.",
  },
  {
    id: "budgeting-tips-sri-lanka",
    title: "5 Simple Budgeting Tips for Young Professionals in Sri Lanka",
    date: "2025-06-28",
    author: "Aanjelo Salgado",
    image:
      "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1932&auto=format&fit=crop",
    image_alt: "A person planning their budget with a calculator and notebook.",
    url: "blog-post.html",
    excerpt:
      "Starting your career is exciting, but managing your first salary can be tricky. Here are five practical tips to get you started on the right foot.",
  },
];
