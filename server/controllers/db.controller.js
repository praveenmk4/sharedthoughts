const user = require('../models/User');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const config = require('../../config');



exports.register = function(req, res) {
    const db = mongoose.connect(config.database);
    var host = req.body.host;
    var newUser = new user({
        email: req.body.email,
        password: req.body.password,
        userdetails: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profileImage: req.body.profileImage,
            phone: req.body.phone,
            hobbies: req.body.hobbies
        }
    });

    newUser.save(function(err) {
        if (err) {
            console.log('Error Inserting New Data');
            if (err.name === 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
            if (err.name === 'MongoError' && err.code === 11000) {
                console.log("mongo error");
                return res.json({ success: false, message: "email already exists" });
            }
        } else {
            res.status(200).json({ success: true, message: 'User had been registered successfully' });
        }
        db.disconnect();
    })

};

//authenticate a user
exports.login = function(req, res) {
    const db = mongoose.connect(config.database);
    console.log(req.body.user.email);
    user.findOne({
        email: req.body.user.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed! User not found' });
        } else if (user) {

            // check if password matches
            console.log(user);
            console.log(user.email);
            if (user.password != req.body.user.password) {
                res.json({ success: false, message: 'Authentication failed! invalid username and password' });
            } else {

                // if user is found and password is right


                // return the information including token as JSON
                res.status(200).json({
                    success: true,
                    message: 'user login successfull',
                    obj: user
                });
            }
        }
        db.disconnect();
    });
};