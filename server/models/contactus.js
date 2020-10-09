
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message:{
        type: String,
        required: true
    }

}, {
    timestamps: true
});


var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;