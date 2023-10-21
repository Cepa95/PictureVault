 // JavaScript code for displaying the selected image and validating the form
 const selectedImage = document.getElementById('selectedImage');
 const imagePreview = document.getElementById('imagePreview');
 const imageInput = document.getElementById('imageInput');
 const errorMessage = document.getElementById('errorMessage');

 imageInput.addEventListener('change', function (e) {
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
 });

 function validateForm() {
   if (imageInput.files.length === 0) {
     errorMessage.style.display = 'block';
     return false; // Prevent form submission if no image is selected
   }
   errorMessage.style.display = 'none';
   return true; // Allow form submission if an image is selected
 }

