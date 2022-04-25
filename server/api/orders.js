const router = require('express').Router()
const { User, Order } = require('../db/')
const { Op } = require('sequelize');

// all order (for admin)
router.get('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization)
    // if user isAdmin
    res.json(await Order.findAll());
  } catch (err) {
    next(err)
  }
})

// all orders (for user)

router.get('/user', async(req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization)
    console.log('auth success')
    res.json(await Order.findAll({
      where: {
        userId: user.id,
        [Op.not]:
          { status: 'CART' },
      }
    }))
  } catch (err) {
    next(err)
  }
});

module.exports = router
