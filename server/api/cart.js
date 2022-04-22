const router = require('express').Router()
const res = require('express/lib/response');
const { user } = require('pg/lib/defaults');
const User = require('../db/User')

router.get('/', async(req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart())
  } catch(err) {
    next(err)
  }
})

module.exports = router
