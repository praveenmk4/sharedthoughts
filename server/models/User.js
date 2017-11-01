const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('user', new Schema({

    email: { type: String, unique: true },
    password: String,
    isActive: { type: Boolean, default: true },
    userdetails: {
        firstName: String,
        lastName: String,
        profileImage: String,
        phone: { type: Number },
        hobbies: String
    }
}));

module.exports = User;