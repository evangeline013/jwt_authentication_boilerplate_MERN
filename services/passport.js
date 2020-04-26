const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = mongoose.model('user');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) { return done(null, false); }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) { return done(null, false); }

        done(null, user);
    } catch (err) {
        return done(err, false);
    }
})

// Setup options for Jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.jwtSecret,
};

// Create Jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (user) { return done(null, user); };
        done(null, false);
    } catch(err) {
        return done(err, false);
    }
})


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);