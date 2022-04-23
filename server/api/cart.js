const router = require('express').Router()
const { User } = require('../db')

router.get('/', async(req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization)
    res.send(await user.getCart())
  } catch(err) {
    console.log('in cart get section')
    next(err)
  }
})

router.post('/addToCart', async (req,res,next) => {
  try {

    const user = await User.ByToken(req.headers.authorization);
    console.log(req.body, 'req in addToCart route')
    res.send(await user.addToCart(req.body))
  } catch (err) {
    next(err)
  }
})

router.post('/removeFromCart', async (req,res,next) => {
  try {
    console.log('got to removefromcart')
    const user = await User.ByToken(req.headers.authorization);
    console.log(req.body, 'req in addToCart route')
    res.send(await user.addToCart(req.body))
  } catch (err) {
    next(err)
  }
})

module.exports = router
