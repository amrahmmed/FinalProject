const mongoose = require('mongoose');

const databaseConnection = async()=> {
    mongoose.connect(`${process.env.CONNECTION_URI}`).then(
        ()=>{
            console.log("Connected Successfully to Database");
        }
    ).catch(
        (error) =>{
        console.log("failed to connect");
    }
    );
};

module.exports = databaseConnection;