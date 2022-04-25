const Sequelize = require('sequelize');
const db = require('./database');

//many products belong to an order
//price would be total of all items
//is this just a reference table?

module.exports = db.define('order', {
  price: {
    type: Sequelize.NUMERIC(10,2),
    validate: {
      min: 0,
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'CART',
    validate: {
      isIn: [['CART', 'ORDER']]
    }
  }
})
