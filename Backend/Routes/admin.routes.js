const express = require('express');
const {
    registerAdmin,
    addDoctor,
    retireDoctor,
    removePatient,
    viewDoctors,
    viewPatients,
} = require('../Controllers/admin.control.js');
const verifyRole = require('../Middleware/verifyRole.js');
const { Admin } = require('../models.js');
const verifyToken = require('../Middleware/verifyToken.js');
const router = express.Router();
router.post("/register",registerAdmin);


router.post("/addDoctor",verifyToken,verifyRole(['Admin']),addDoctor);
router.delete("/retireDoctor/:id",verifyToken,verifyRole(['Admin']),retireDoctor);
router.delete("/removePatient/:patientId",verifyToken,verifyRole(['Admin']),removePatient);
router.get("/viewDoctors",verifyToken,verifyRole(['Admin']),viewDoctors)
router.get("/viewPatients",verifyToken,verifyRole(['Admin']),viewPatients)
module.exports = router;