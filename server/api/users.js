const router = require('express').Router();
// const Product = require('../db/Product')
const { User } = require('../db');


router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  } catch (err) {
    next(err)
  }
})

router.get('/auth/me', async(req, res, next) => {
  try {
    res.send(await User.byToken(req.headers.authorization))
  } catch (err) {
    next (err)
  }
})


module.exports = router
