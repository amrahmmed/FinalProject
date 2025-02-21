const {Patient, User} = require('../models.js')

const login = async(req, res) =>{
    const {email,password}= req.body
    try{
        const user = await User.findOne({email});
        if(user && user.password == password){
            res.json(user);

        }else{
            res.status(404).send('User not found');
        }
    }catch(error){
        res.status(500).send(error.message);
    }
};

const register = async(req,res) =>{
    const patient = new Patient({
        name: req.body.name,
        email: req.body.email,
        fullname: req.body.fullname,
        phoneNumber: req.body.phoneNumber,
        role: "Patient",
        gender: req.body.gender,
        birthdate: req.body.birthdate
    });
    try{await patient.save();
        res.json(patient);
    }catch(error){
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

const getRelatedDoctor = async (req, res) => {
    const patientID = req.params.id;
    try {
        const patient = await Patient.findById(patientID).populate("attendingDoctor");

        if (!patient) {
            return res.status(404).send("Patient not found");
        }

        res.json(patient.attendingDoctor); 
    } catch (error) {
        res.status(500).send(error.message);
    }
};

modules.export = {
    register,
    login,
    updatePatient,
    getRelatedDoctor
}

