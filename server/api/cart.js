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
  try {

    // const user = await User.ByToken(req.headers.authorization);
    console.log(req.body, 'req in addToCart route')
    res.send(await user.addToCart(req.body))
  } catch (err) {
    next(err)
  }
})

router.post('/removeFromCart', async (req,res,next) => {
  try {
    console.log('got to removefromcart')
    console.log(req.body,'req')
    console.log(req.headers.authorization, 'token')

    //why is this method suddenly broken
    // const user = await User.ByToken();
    // console.log(req.body, 'req in addToCart route')
    // res.send(await user.addToCart(req.body))
    res.send(await User.byToken(req.headers.authorization))
  } catch (err) {
    next(err)
  }
})

module.exports = router
