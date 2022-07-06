const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_Schema = new Schema({
    username : {type: String},
    password : {type: String},
});
 

module.exports = mongoose.model('User', User_Schema);