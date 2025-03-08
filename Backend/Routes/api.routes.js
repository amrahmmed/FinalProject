const express = require("express");
const router = express.Router();

const patientRouter = require("./patient.routes.js");
const doctorRouter = require("./doctor.routes.js");
const adminRouter = require("./admin.routes.js");
const login = require("../authentication/login.js");

router.post("/login", login);
router.use("/patient", patientRouter);
router.use("/doctor", doctorRouter);
router.use("/admin", adminRouter);

module.exports = router;

/*
{
    "token": "eyJhbGciOiJIUzI1NiJ9.ICB1c2Vy.kPTkzjGkTW2yoVHoBPtpSGbVmKwGWrJrPXRnJmZCVDQ",
    "user": {
        "id": "67c998f37ec8ecec9bee393a",
        "fullname": "Dr. Hussien",
        "email": "Hussien@email.com",
        "role": "Doctor"
    }
}
*/
