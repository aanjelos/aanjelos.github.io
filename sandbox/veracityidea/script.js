document.addEventListener('DOMContentLoaded', function() {
    const rectangles = document.querySelectorAll('.rectangle');
  
    rectangles.forEach(rectangle => {
      rectangle.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
      });
  
      rectangle.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
      });
    });
  });
  