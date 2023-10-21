const selectedImage = document.getElementById('selectedImage');
const imagePreview = document.getElementById('imagePreview');
const imageInput = document.getElementById('imageInput');
const errorMessage = document.getElementById('errorMessage');

imageInput.addEventListener('change', function (e) {
  errorMessage.style.display = 'none';
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      selectedImage.src = event.target.result;
      imagePreview.style.display = 'block'; // Show the image preview
    };

    reader.readAsDataURL(file);
  } else {
    selectedImage.src = '';
    imagePreview.style.display = 'none';
  }
})