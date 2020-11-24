const express = require('express');
const mongoose = require('mongoose');
const keys = require('./configs/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI)
    .catch((err) => {
        console.log(`failed to connect: ${err}`);
    })

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);