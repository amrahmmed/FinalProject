const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");



const apiroutes = require('./Routes/api.routes'); 



const app = express();
const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("Error connecting to database"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', apiroutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});