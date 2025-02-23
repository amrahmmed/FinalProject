const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiroutes = require('./Routes/api.routes'); 

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/EMBS_Backend')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', apiroutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});