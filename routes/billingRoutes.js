const keys = require('../configs/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    app.post('/api/stripe', async (req, res) => {
        const payment = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '5$ for emaily credits',
            source: req.body.id
        })
        console.log(payment);
        //passport helps us with accessing the user with req.user
        req.user.credits += 5;
        const user = await req.user.save();
        res.status(201).send({user})
    })
}