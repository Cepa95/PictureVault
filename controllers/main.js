const path = require("path");
const fs = require("fs");

const upload = require("../models/upload");


// Define a route for uploading pictures (move this logic to the controller)
exports.uploadImage = (req, res, next) => {
  // Use the upload middleware to handle file upload
  upload.single("image")(req, res, function (err) {
    if (err) {
      // Handle any errors, e.g., file upload failed
      return res.status(500).send("Error uploading the image");
    }

    // After successful image upload, use res.redirect without the second argument
    res.redirect("/gallery?success=true");
  });
};


exports.renderMainIndex = (req, res) => {
  res.render("main/index", { pageTitle: "index", path: "/" });
};

exports.displayGallery = (req, res) => {
  const uploadDirectory = path.join(__dirname, "../public/uploads");
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading uploaded images");
    }

    const successMessage =
      req.query.success === "true" ? "Image uploaded successfully" : "";

    res.render("main/gallery", {
      images: files,
      successMessage,
      currentPage: 1,
      totalImages: files.length, // Total number of images
      pageTitle: "Gallery",
      path: "/gallery",
    });
  });
};


exports.displayHomePage = (req, res) => {
  res.render("main/home-page", { pageTitle: "Home page", path: "/home" });
};
