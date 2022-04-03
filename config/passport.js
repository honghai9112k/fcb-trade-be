const GoogleStrategy = require('passport-google-oidc');
const passport = require("passport");

const GOOGLE_CLIENT_ID ="204722963832-8liiqbolck5p1jfi7ksnjv9a880uk8t5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:1337/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});