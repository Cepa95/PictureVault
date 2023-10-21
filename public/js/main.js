 function validateForm() {
   if (imageInput.files.length === 0) {
     errorMessage.style.display = 'block';
     return false; // Prevent form submission if no image is selected
   }
   errorMessage.style.display = 'none';
   return true; // Allow form submission if an image is selected
 }


