const {Doctor, User} = require('../models.js')


const register = async (req, res) => {
    try {
        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            role: "Doctor",
            gender: req.body.gender,
            password: req.body.password,
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
    try{
        const userId = req.params.id;
        const patients = await User.find({ doctorId: userId }).select("-password");

    if (!patients.length) {
      return res.status(404).json({ msg: "No patients assigned to you." });
    }

    res.json({ msg: "Patients retrieved successfully", patients });
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
