const{
    editInfo,
    viewRelatedPatients

} = require('../Controllers/doctor.control.js')

const express = require('express');
const router = express.Router();

router.patch('/edit-info/:id',editInfo);
router.get('view-related-patients',viewRelatedPatients);


module.exports = router;