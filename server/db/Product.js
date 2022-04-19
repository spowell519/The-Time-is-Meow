const Sequelize = require('sequelize')
const db = require('./database')

module.exports = db.define('product', {
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
      isIn: [['treat', 'toy', 'costume']]
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'example.png',
    validate: {
      notEmpty: true
    }
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
    validate: {
      min: 0
    }
  }
})
