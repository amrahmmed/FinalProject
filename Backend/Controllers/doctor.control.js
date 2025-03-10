const {Doctor, User} = require('../models.js')

const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedpassword =  await bcrypt.hash(req.body.password,salt);
        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            role: "Doctor",
            gender: req.body.gender,
            password: hashedpassword,
            birthdate: req.body.birthdate
        });

        await user.save();  

        const newDoctor = new Doctor({
            user: user._id,   
            specialization: req.body.specialization
        });

        await newDoctor.save();  

        res.json({ user, doctor: newDoctor });  
    } catch (error) {
        res.status(500).send(error.message);
    }
};
    

const editInfo =async(req,res) =>{
    try{
        const { birthdate, email, phoneNumber }= req.body;
        const userId = req.params.id;
        const updatedDoctor = await User.findByIdAndUpdate(
            userId,
            { birthdate, email, phoneNumber },
            { new : true } 
        );
        if (!updatedDoctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }
        res.json({ msg: "Doctor info updated successfully", doctor: updatedDoctor });
    } 
    catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
    }
};

const viewRelatedPatients = async(req,res) =>{
    const userId = req.params.id;
    console.log(userId);
    try{
        
    const user = await Doctor.findById(userId).populate("attendingPatients");

    console.log(user);
    console.log(user.role);

    if (!user) {
        return res.status(404).json({ msg: "Doctor not found" });
    }

    const patients = user.attendingPatients || [];

    if (!patients.length) {
      return res.status(404).json({ msg: "No patients assigned to you." });
    
    }else{
        res.status(200).json({msg:"List of patients",patients});
    }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg:"Server error"});
    }
};


module.exports = {
    editInfo,
    viewRelatedPatients,
    register
}
