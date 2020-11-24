const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./configs/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI)
    .catch((err) => {
        console.log(`failed to connect: ${err}`);
    })

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 100,
    keys: [keys.cookieKey]
  }))

app.use(passport.initialize());
app.use(passport.session());
  
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);