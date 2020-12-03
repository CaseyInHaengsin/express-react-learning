const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const keys = require('./configs/keys')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI).catch(err => {
  console.log(`failed to connect: ${err}`)
})

const app = express()
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 100,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
if (process.env.NODE_ENV === 'production'){
    //Make sure express will serve up prod assets
    app.use(express.static('client/build'));
    //Express will serve index.js if route isn't found
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 5000

app.listen(PORT)
