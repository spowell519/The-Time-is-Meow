const Sequelize = require('sequelize');
const db = require('./database');

const Product_order = db.define('product_order', {
  productQty: {
    type: Sequelize.INTEGER
  },
  productPrice: {
    type: Sequelize.NUMERIC(10,2),
    validate: {
      min: 0
    }
  }
})

module.exports = Product_order
