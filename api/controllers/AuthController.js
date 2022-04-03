
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000";
module.exports = {
    google: function (req, res) {
        // passport.authenticate('google-plus-token', function(error, user, info) {
        //     if (error) return res.serverError(error);
        //     if (info) return res.unauthorized(info);
        //     return res.ok(user);
        // });
        passport.authenticate('google', { scope: ["email"] })
    },
    callback: (req, res) => {
        passport.authenticate("google", {
            successRedirect: CLIENT_URL,
            failureRedirect: "http://localhost:1337/auth/login/failed",
        })
    }
};