//  DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MODEL or SCHEMA
const shoeSchema = Schema({
    style: { type: String },
    color: { type: String },
    height: { type: String }
});

//  ATTACH SCHEMA TO COLLECTION
const Shoe = mongoose.model('Shoe', shoeSchema);

// EXPORT OBJECT
module.exports = Shoe;
