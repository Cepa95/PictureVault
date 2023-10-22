const express = require("express");

const adminController = require("../controllers/admin")

const router = express.Router();

router.get('/admin', adminController.displayAdminPage);


module.exports = router;