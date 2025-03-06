const {Patient, User, Doctor} = require('../models.js')

const bcrypt = require('bcrypt');



const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedpassword =  await bcrypt.hash(req.body.password,salt);
        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            role: "Patient",
            gender: req.body.gender,
            password: hashedpassword, 
            birthdate: req.body.birthdate
        });

        await user.save();  

        const newPatient = new Patient({
            user: user._id   
        });

        await newPatient.save();  

        res.json({ user, patient: newPatient });  
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const updatePatient = async(req,res) =>{
    const patientID = req.params.id;

    try{
        const updatedPatient = await Patient.updateOne({
        _id: patientID        
        },{
            $set:{
                ...req.body
            }
        })
        res.json(updatedPatient)
    }catch(error){
        res.status(500).send(error.message);
    }
}

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('user');

        if (!doctors || doctors.length === 0) {
            return res.status(404).send("No doctors found");
        }

        res.json(doctors); 
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    register,
    updatePatient,
    getDoctors
}

