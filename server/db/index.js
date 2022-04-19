const db = require('./database')
const User = require('./User')
const Order = require('./Order')
const Product = require('./Product')
const Review = require('./Review')

//define associations
//a review can have one User
//a User can have many reviews
User.hasMany(Review)
Review.belongsTo(User)

//an Order can have one User
//a User can have many Orders
User.hasMany(Order)
Order.belongsTo(User)

//a review can have one product
//a product can have many reviews
Product.hasMany(Review)
Review.belongsTo(Product)

//A product can have many orders???
//An order can have many products
//Will deal with this later
//Product.belongsToMany(Order, {through: 'completedOrders'})
//Order.belongsToMany(Product)



module.exports = {
  db,
  User,
  Order,
  Product,
  Review
}
