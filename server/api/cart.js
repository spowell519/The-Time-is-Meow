const router = require('express').Router()
const User = require('../db/User')

router.get('/', async(req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization)
    res.send(await user.getCart())
  } catch(err) {
    next(err)
  }
})

router.post('/addToCart', async (req,res,next) => {
  console.log('before addtocart try block')
  try {
    const user = await User.byToken(req.headers.authorization);
    console.log('got to addtocart token')
    res.send(await user.addToCart(req.body))
  } catch (err) {
    next(err)
  }
})

router.post('/removeFromCart', async (req,res,next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body))
  } catch (err) {
    next(err)
  }
})

module.exports = router
