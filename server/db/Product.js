const Sequelize = require('sequelize')
const db = require('./database')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['treat', 'toy', 'clothing']]
    }
  },
  price: { //price is input in pennies
    type: Sequelize.NUMERIC(10,2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'example.png',
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "A wonderful gift for YOUR pet!"
  },
  rating: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 5
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull:false,
    validate: {
      min: 0
    }
  }
})

module.exports = Product

Product.beforeCreate( async (product) => {
  //figure out how to ensure two decimal points
  const dollarPrice = product.price/100
  product.price = dollarPrice
})
