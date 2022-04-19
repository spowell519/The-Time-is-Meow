const Sequelize = require('sequelize');
const db = require('./database')

module.exports = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  creditCardNumber: {
    //this will get hashed, so it will create a STRING
    type: Sequelize.STRING
  },
  creditCardExp: {
    //this will get hashed, so it will create a STRING
    type: Sequelize.STRING
  },
  CreditCardSec: {
    //this will get hashed, so it will create a STRING
    type: Sequelize.STRING
  }
})
