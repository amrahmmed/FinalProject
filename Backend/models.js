const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    role: {  
        type: String,
        required: true,
        enum: ["Patient", "Admin", "Doctor"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true

    }
});



const User = mongoose.model('User', userSchema);

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendingDoctor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor',
        required: false
    }
});

const Patient = mongoose.model('Patient', patientSchema);


const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);


const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: { 
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { User, Patient, Admin, Doctor };
