'use strict';
const bcrypt = require('bcrypt');

module.exports = {

    attributes: {
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        }
    },

    // Here we encrypt password before creating a User
    // beforeCreate(values, next) {
    //     bcrypt.genSalt(10, (err, salt) => {
    //         if (err) {
    //             sails.log.error(err);
    //             return next();
    //         }

    //         bcrypt.hash(values.password, salt, (err, hash) => {
    //             if (err) {
    //                 sails.log.error(err);
    //                 return next();
    //             }
    //             values.encryptedPassword = hash; // Here is our encrypted password
    //             return next();
    //         });
    //     });
    // },

    // comparePassword(password, encryptedPassword) {

    //     return new Promise(function(resolve, reject) {
    //         bcrypt.compare(password, encryptedPassword, (err, match) => {
    //             if (err) {
    //                 sails.log.error(err);
    //                 return reject("Something went wrong!");
    //             }
    //             if (match) return resolve();
    //             else return reject("Mismatch passwords");
    //         });
    //     });
    // }
};