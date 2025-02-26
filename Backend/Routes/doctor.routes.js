const{
    editInfo,
    viewRelatedPatients,
    register
} = require('../Controllers/doctor.control.js')

const express = require('express');
const router = express.Router();


router.post('/register',register)
router.patch('/edit-info/:id',editInfo);
router.get('view-related-patients',viewRelatedPatients);


module.exports = router;