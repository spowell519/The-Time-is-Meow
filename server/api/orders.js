const router = require('express').Router()
const { User, Order } = require('../db/')
const { Op } = require('sequelize');

// all order (for admin)
router.get('/', async (req, res, next) => {
  try {
    console.log('admin order get')
    const user = await User.byToken(req.headers.authorization);
    console.log('is admin?', user.isAdmin);
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
  console.log('user order get')
  try {
    const user = await User.byToken(req.headers.authorization)
    const myOrders = (await Order.findAll({
      include: User,
      where: {
        [Op.and]: [
          { userId: user.id },
          { status: 'PENDING' }
        ]
      }
    }))
    res.json(myOrders)
  } catch (err) {
    next(err)
  }
});

module.exports = router
