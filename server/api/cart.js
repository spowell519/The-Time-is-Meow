const router = require('express').Router()
// const { user } = require('pg/lib/defaults')1
const User = require('../db/User')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization)
    res.send(await user.getCart())
  } catch (err) {
    next(err)
  }
})

router.post('/addToCart', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    if (user) res.send(await user.addToCart(req.body))
  } catch (err) {
    next(err)
  }
})

router.post('/removeFromCart', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body))
  } catch (err) {
    next(err)
  }
})

//not being used right now, might be for stripe
router.post('/create-checkout-session', async (req, res, next) => {
  try{
    console.log(req.body, 'req.body')
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          //need to figure out how total is passed through
          price: req.body.price,
          currency: "usd"
        }
      ]
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch(err) {
    next(err)
  }
})

router.put('/createOrder', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.createOrder(req.body))
    history.push('/checkout')
  } catch (err) {
    next(err)
  }
})

module.exports = router;
