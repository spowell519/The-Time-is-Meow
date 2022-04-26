const router = require('express').Router()
const { User, Order } = require('../db/')
const { Op } = require('sequelize');

// all order (for admin)
router.get('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    (user.isAdmin)
    ?
        res.json(await Order.findAll({
          include: User,
          where: {
            [Op.not]:
              { status: 'CART' },
          }
        }))
    : res.status(403).send('You shall not pass!')
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
