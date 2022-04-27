const router = require('express').Router()
// const { user } = require('pg/lib/defaults')1
const User = require('../db/User')
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
    console.log('** hit ADD route')
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

router.post('/create-checkout-session', async (req, res, next) => {
  try{
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: ''
        }
      ]
    })
  } catch(err) {
    next(err)
  }
})

router.put('/createOrder', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.createOrder(req.headers.total))
  } catch (err) {
    next(err)
  }
})

module.exports = router;
