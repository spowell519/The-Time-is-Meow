const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const db = require('./database');
const LineItem = require('./LineItem');
const Product = require('./Product');

const Order = db.define('order', {
  price: {
    type: Sequelize.NUMERIC(10, 2),
    validate: {
      min: 0,
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'CART',
    validate: {
      isIn: [['CART', 'PENDING', 'SHIPPED']]
    }
  },
  date: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.updatedAt.toString().slice(4, 15)
    }
  }
})

Order.beforeUpdate(async (order) => {
  const cartItems = await LineItem.findAll({
    where: {
      orderId: order.id
    },
    include: [{
      model: Product
    }]
  })
  let prices = []
  if (cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      prices.push(Number(cartItems[i].dataValues.product.dataValues.price))
    }
  }
  if (cartItems.length > 0) {
    const total = prices.reduce((price, accum) => Number(price) + accum)
    order.price = total
  }
})

module.exports = Order
