const {
    register,
    login,
    updatePatient,  
    getDoctors
} = require('../Controllers/patient.control.js');

const express = require('express');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);

router.patch('/update-patient/:id',updatePatient);
router.get('/get-related-doctor/:id',getDoctors);

module.exports = router;