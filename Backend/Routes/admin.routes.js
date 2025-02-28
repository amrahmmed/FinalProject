const express = require('express');
const {
    registerAdmin,
    loginAdmin,
    addDoctor,
    retireDoctor,
    removePatient,
    viewDoctors,
    viewPatients,
} = require('../Controllers/admin.control.js')
const router = express.Router();
router.post("/register",registerAdmin);
router.post("/login",loginAdmin);
router.post("/addDoctor",addDoctor);
router.delete("/reitreDocotr/:doctorId",retireDoctor);
router.delete("/removePatient/:patientId",removePatient);
router.get("/viewDocotrs",viewDoctors)
router.get("/viewPatients",viewPatients)
module.exports = router;