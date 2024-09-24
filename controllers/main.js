const path = require("path");
const upload = require("../models/upload");
const bucket = require("../config/firebase-config");
const axios = require('axios');
const archiver = require('archiver');
const stream = require('stream');

exports.uploadImage = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      return res.status(500).send("Error uploading the image");
    }

    const blob = bucket.file(Date.now().toString() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: Date.now().toString()
        }
      }
    });

    blobStream.on('error', (err) => {
      return res.status(500).send("Error uploading the image");
    });

    blobStream.on('finish', () => {
      // Make the file public
      blob.makePublic().then(() => {
        res.redirect("/gallery?success=true");
      }).catch((err) => {
        console.error(err);
        res.status(500).send("Error making the image public");
      });
    });

    blobStream.end(req.file.buffer);
  });
};

exports.downloadGallery = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    const fileUrls = files.map(file => `https://storage.googleapis.com/${bucket.name}/${file.name}`);

    const archive = archiver('zip', {
      zlib: { level: 9 } 
    });

    res.attachment('gallery.zip');

    archive.pipe(res);

    for (const url of fileUrls) {
      const response = await axios({
        url,
        responseType: 'stream'
      });

      const fileName = url.split('/').pop();
      archive.append(response.data, { name: fileName });
    }

    archive.finalize();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error downloading the gallery');
  }
};

exports.renderMainIndex = (req, res) => {
  res.render("main/index", { pageTitle: "index", path: "/" });
};

exports.displayGallery = (req, res) => {
  bucket.getFiles((err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading uploaded images");
    }

    const fileUrls = files.map(file => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
    const successMessage = req.query.success === "true" ? "Image uploaded successfully" : "";

    res.render("main/gallery", {
      images: fileUrls,
      successMessage,
      currentPage: 1,
      totalImages: fileUrls.length, 
      pageTitle: "Gallery",
      path: "/gallery",
    });
  });
};

exports.displayHomePage = (req, res) => {
  const gifPath = '/animations/ring.gif';
  res.render("main/home-page", { pageTitle: "Home page", path: "/home", gifUrl: gifPath });
};