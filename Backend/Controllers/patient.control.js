const {Patient, User, Doctor} = require('../models.js')

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

const register = async (req, res) => {
    try {
        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            role: "Patient",
            gender: req.body.gender,
            password: req.body.password,
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
    login,
    updatePatient,
    getDoctors
}

