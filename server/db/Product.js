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
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [],
  },
  price: { //price is input in pennies
    type: Sequelize.NUMERIC(10, 2),
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
    allowNull: false,
    validate: {
      min: 0
    }
  }
})


Product.beforeCreate( async (product) => {
  //figure out how to ensure two decimal points
  const dollarPrice = product.price / 100
  product.price = dollarPrice
})

// get all used category tags:
Product.getCategories = async () => {
  const productCategories = await Product.findAll(
    {attributes: ['category']}
    );
    const tags = [];
    for (let i = 0; i < productCategories.length; i++) {
      for (let j = 0; j < productCategories[i].category.length; j++) {
        if (!tags.includes(productCategories[i].category[j])) tags.push(productCategories[i].category[j])
      }
    }
    return tags;
  }

  module.exports = Product
