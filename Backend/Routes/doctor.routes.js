const{
    editInfo,
    viewRelatedPatients,
    register
} = require('../Controllers/doctor.control.js')

const login = require("../authentication/login.js")

const express = require('express');
const verifyRole = require('../Middleware/verifyRole.js');
const verifyToken = require('../Middleware/verifyToken.js');
const router = express.Router();

router.post("/login",login)
router.post('/register',register);

router.patch('/edit-info/:id',verifyToken,verifyRole(["Doctor"]),editInfo);

router.get('/view-related-patients/:id',verifyRole(['Doctor']),verifyToken,viewRelatedPatients);


module.exports = router;