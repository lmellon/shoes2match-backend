// ========================
//      DEPENDENCIES
// ========================
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

// ========================
//          PORT
// ========================
const PORT = process.env.PORT || 3000;

// ========================
//      MIDDLEWARE
// ========================
app.use(cors());
app.use(bodyParser.json());

// ========================
//      DATABASE
// ========================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shoes2match"
mongoose.connect(MONGODB_URI , { useNewUrlParser: true});

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open' , ()=> console.log('connected to mongo'));


// ========================
//      LISTENER
// ========================
app.listen(PORT, () => console.log('Listening on port: ', PORT))
