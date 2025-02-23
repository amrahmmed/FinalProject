const express = require('express');
const router = express.Router();

const patientRouter = require('./patient.routes.js');
const doctorRouter = require('./doctor.routes.js');
const adminRouter = require('./admin.routes.js');

router.use('/patient', patientRouter);
router.use('/doctor', doctorRouter);
router.use('/admin', adminRouter);

module.exports = router;