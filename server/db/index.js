const db = require('./database')
const User = require('./User')
const Order = require('./Order')
const Product = require('./Product')
const Review = require('./Review')

//define associations
//a review can have one User
//a User can have many reviews

//an Order can have one User
//a User can have many Orders

//A product can have many orders???
//An order can have many products

//a review can have one product
//a product can have many reviews

module.exports = {
  db,
  User,
  Order,
  Product,
  Review
}
