const express = require("express");

const mainController = require("../controllers/main")

const router = express.Router();



router.post('/upload', mainController.uploadImage);

router.get('/', mainController.renderMainIndex);

router.get('/gallery', mainController.displayGallery);


module.exports = router;
