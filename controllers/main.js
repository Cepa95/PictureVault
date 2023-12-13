const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

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

exports.downloadGallery = (req, res) => {
  const uploadDirectory = path.join(__dirname, "../public/uploads");
  const zipFileName = "gallery.zip";
  const zipFilePath = path.join(__dirname, "../public", zipFileName);

  // Create a zip file
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Set compression level
  });

  const output = fs.createWriteStream(zipFilePath);

  output.on("close", () => {
    // Send the zip file as a response
    res.sendFile(zipFilePath, (err) => {
      // Cleanup: Delete the generated zip file after sending
      fs.unlink(zipFilePath, (err) => {
        if (err) {
          console.error("Error deleting zip file:", err);
        }
      });
    });
  });

  archive.on("error", (err) => {
    res.status(500).send("Error creating zip file");
  });

  // Pipe the archive to the output stream
  archive.pipe(output);

  // Add all files from the upload directory to the zip file
  archive.directory(uploadDirectory, false);

  // Finalize the archive
  archive.finalize();
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
  const gifPath = '/animations/ring.gif';
  res.render("main/home-page", { pageTitle: "Home page", path: "/home", gifUrl: gifPath });
};
