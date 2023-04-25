const express = require('express');
const router = express.Router();
const addFranchise = require("../config/con_sub_franchise");

router.post("/addSubFrenchise", addFranchise.addSubFranchise);

router.post("/editSubFranchise", addFranchise.editSubFranchise);

router.post("/deleteSubFranchise", addFranchise.deleteSubFranchise);

router.get("/getSubFranchise", addFranchise.getSubFranchise);

module.exports = router;