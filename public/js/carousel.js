document.addEventListener('DOMContentLoaded', function() {
    var currentPage = 0; // Initialize the current page to 0
  
    // Get the left and right arrow controls
    var prevButton = document.getElementById('carousel-control-prev');
    var nextButton = document.getElementById('carousel-control-next');
  
    // Add click event listeners to the left and right arrow controls
    prevButton.addEventListener('click', function() {
      // Decrease the current page by 1 and loop back to the last image if at the beginning
      currentPage = currentPage === 0 ? totalImages - 1 : currentPage - 1;
      updateImageCounter();
    });
  
    nextButton.addEventListener('click', function() {
      // Increase the current page by 1 and loop back to the first image if at the end
      currentPage = currentPage === totalImages - 1 ? 0 : currentPage + 1;
      updateImageCounter();
    });
  
    // Function to update the image counter
    function updateImageCounter() {
      var imageCounter = document.querySelector('.image-counter');
      imageCounter.innerHTML = (currentPage + 1) + '/' + totalImages;
    }
  });
  