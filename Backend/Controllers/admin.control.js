const { Patient, User, Doctor, Admin } = require("../models.js");
const bcrypt = require("bcrypt");

const registerAdmin = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const newuser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      role: "Admin",
      gender: req.body.gender,
      password: hashedpassword,
      birthdate: req.body.birthdate,
    });

    await newuser.save();

    const newAdmin = new Admin({
      user: newuser._id,
    });

    await newAdmin.save();

    res.json({ newuser, Admin: newAdmin });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addDoctor = async (req, res) => {
  try {
    console.log("Incoming request to add doctor:", req.body); // 🔍 Log request data

    // Validate required fields
    const { fullname, email, phoneNumber, gender, password, birthdate } =
      req.body;
    if (
      !fullname ||
      !email ||
      !phoneNumber ||
      !gender ||
      !password ||
      !birthdate
    ) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use!" });
    }

    // Create new User with role "Doctor"
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      gender,
      password, // TODO: Hash password before saving (bcrypt recommended)
      birthdate,
      role: "Doctor",
    });

    await newUser.save();

    // Create Doctor profile linked to the new User
    const newDoctor = new Doctor({
      user: newUser._id,
      specialization: "General", // Default specialization (Modify as needed)
    });

    await newDoctor.save();

    res
      .status(201)
      .json({ msg: "Doctor added successfully!", doctor: newDoctor });
  } catch (error) {
    console.error("❌ Error adding doctor:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
const retireDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const doctor = await Doctor.findById(doctorId);

    if (doctor == null) {
      return res.status(404).json({ msg: "Doctor not found!" });
    }
    await Doctor.findByIdAndDelete(doctorId);
    res.status(200).json({ msg: "Doctor retired successfully" });
  } catch (error) {
    console.error("Error retiring doctor:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const removePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await User.findOneAndDelete({
      _id: patientId,
      role: "Patient",
    });
    if (!patient) return res.status(404).json({ msg: "Patient not found" });
    res.json({ msg: "patient retired successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

const viewDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate({
      path: "user",
      select: "-password",
    });

    res.json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error lol " });
  }
};
const viewPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate({
      path: "user",
      select: "-password",
    });

    res.json({ patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = {
  registerAdmin,
  addDoctor,
  retireDoctor,
  removePatient,
  viewDoctors,
  viewPatients,
};
