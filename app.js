const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const app = express();

// Set up the view engine
app.set('view engine', 'ejs');

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define a route for uploading pictures
app.post('/upload', upload.single('image'), (req, res) => {
  // After successful image upload
  res.redirect('/gallery?success=true');
});


// Define a route to render the HTML form
app.get('/', (req, res) => {
  res.render('index');
});

// Add this route to display all uploaded images
// Modify the /gallery route to pass the success message
app.get('/gallery', (req, res) => {
  const uploadDirectory = path.join(__dirname, 'public/uploads');
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading uploaded images');
    }

    const successMessage = req.query.success === 'true' ? 'Image uploaded successfully' : '';

    res.render('gallery', { images: files, successMessage });
  });
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
