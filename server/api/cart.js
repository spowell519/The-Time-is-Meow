const router = require('express').Router()
// const { user } = require('pg/lib/defaults')1
const User = require('../db/User')

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
    console.log('hit route')
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

router.put('/createOrder', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.createOrder(req.headers.total))
  } catch (err) {
    next(err)
  }
})

module.exports = router;
