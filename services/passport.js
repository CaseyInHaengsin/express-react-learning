const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../configs/keys');

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleSclientSecret,
	callbackURL: '/auth/google/callback'
	}, (accessToken, refreshToken, profile,done) => {
		console.log(refreshToken);
		console.log(profile);
		console.log(accessToken);
	})
);
