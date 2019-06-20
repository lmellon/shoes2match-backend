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


// ========================
//     CONTROLLER
// ========================
const router = express.Router();
const Shoe = require('./models.js');
// const router = require('./controllers.js')
app.use('/shoes', router);

// ========================
//     ROUTES
// ========================
// Home Page
router.route('/').get(function(req,res) {
    Shoe.find(function(err, shoes) {
        if (err) {
            console.log(err);
        } else {
            res.json(shoes);
        }
    });
});

// Detail Page
router.route('/:id').get(function(req,res) {
    let id = req.params.id;
    Shoe.findById(id, function(err, shoe) {
        res.json(shoe);
    });
});

// Add Page
router.route('/add').post(function(req, res) {
    let shoe = new Shoe(req.body);
    shoe.save()
        .then(shoe => {
            res.status(200).json({ "shoe" : "new shoe added" });
        })
        .catch(err => {
            res.status(400).send('adding shoe failed')
        });
});

// Update Page
router.route('/update/:id').post(function(req, res) {
    Shoe.findById(req.params.id, function(err, shoe) {
        if (!shoe)
            res.status(404).send('data is not found');
        else
            shoe.style = req.body.style;
            shoe.color = req.body.color;
            shoe.brand = req.body.brand;

        shoe.save().then(shoe => {
            res.json('Shoe updated!');
        })
        .catch(err => {
            res.status(400).send('Update not possible');
        });
    });
});
