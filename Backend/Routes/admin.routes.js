const express = require('express');
const {
    registerAdmin,
    loginAdmin,
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
router.post("/login",loginAdmin,);
router.post("/addDoctor",verifyRole(['Admin']),verifyToken,addDoctor);
router.delete("/retireDoctor/:id",verifyRole(['Admin']),verifyToken,retireDoctor);
router.delete("/removePatient/:patientId",verifyRole(['Admin']),verifyToken,removePatient);
router.get("/viewDoctors",verifyRole(['Admin']),verifyToken,viewDoctors)
router.get("/viewPatients",verifyRole(['Admin']),verifyToken,viewPatients)
module.exports = router;