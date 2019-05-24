const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(matchedUser => {
    done(null, matchedUser);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback" //after google grant permission, redirect the app to this url
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (!existingUser) {
          new User({
            googleId: profile.id
          })
            .save()
            .then(user => {
              done(null, user);
            });
        } else {
          done(null, existingUser);
        }
      });
    }
  )
);
