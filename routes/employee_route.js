const express = require('express');
const router = express.Router();
const addEmployee = require("../controller/con_employee");

router.post("/addEmployee", addEmployee.addEmployee);

router.post("/editEmployee", addEmployee.editEmployee);

router.post("/deleteEmployee", addEmployee.deleteEmployee);

router.get("/getEmployee", addEmployee.getEmployee);

module.exports = router;