const {
    register,
    updatePatient,  
    getDoctors
} = require('../Controllers/patient.control.js');

const login = require('../authentication/login.js');

const verifyToken = require('../Middleware/verifyToken.js');
const verifyRole = require('../Middleware/verifyRole.js')

const express = require('express');
const router = express.Router();

router.post('/register',register);


router.patch('/update-patient/:id',verifyToken,verifyRole(['Patient']),updatePatient);
router.get('/get-related-doctor/:id',verifyToken,verifyRole(['Patient']),getDoctors);

module.exports = router;