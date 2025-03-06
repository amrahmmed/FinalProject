const{
    editInfo,
    viewRelatedPatients,
    register
} = require('../Controllers/doctor.control.js')

const express = require('express');
const verifyRole = require('../Middleware/verifyRole.js');
const verifyToken = require('../Middleware/verifyToken.js');
const router = express.Router();


router.post('/register',verifyRole(['Doctor']),verifyToken,register);

router.patch('/edit-info/:id',verifyRole(['Doctor']),verifyToken,editInfo);

router.get('/view-related-patients/:id',verifyRole(['Doctor']),verifyToken,viewRelatedPatients);


module.exports = router;