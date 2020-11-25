const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../configs/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
	let userFound = await User.findById(id);
	done(null, userFound);
});

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleSclientSecret,
	callbackURL: '/auth/google/callback',
	proxy: true
	
	}, async (accessToken, refreshToken, profile, done) => {
		let existingUser = await User.findOne({ googleId: profile.id })
		if (existingUser){
			done(null, existingUser);
		} else{
			let newUser = await new User({ googleId: profile.id, name: profile.displayName}).save();
			done(null, newUser);
		}
	})
);

