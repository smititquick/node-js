const express = require('express');
const router = express.Router();
const getProfile = require("../controller/get_profile");

router.get("/getProfile", getProfile.getProfile);

module.exports = router;