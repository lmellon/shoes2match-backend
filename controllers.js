const express = require('express');
const router = express.Router();
const Shoe = require('./models.js');

router.route('/').get(function(req,res) {
    Shoe.find(function(err, shoes) {
        if (err) {
            console.log(err);
        } else {
            res.json(shoes);
        }
    });
});
