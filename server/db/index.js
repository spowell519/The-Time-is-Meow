const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('./database')
const User = require('./User')
const Order = require('./Order')
const Product = require('./Product')
const Review = require('./Review')

const SECRET_KEY = process.env.JWT;


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

User.beforeCreate(async (user) => {
  const hashedPW = await bcrypt.hash(
      user.password,
      10, // salt rounds
  );
  // console.log('hashedpw', hashedPW);
  user.password = hashedPW;
  // stolen from stack overflow, also works:
  // user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
});

User.byToken = async(token) => {
  try {
    //if verify fails, throws error
    const payload = jwt.verify(token, SECRET_KEY);
  //  console.log('payload:', payload);
    const user = await User.findByPk(payload.userID);
    if (user) {
      return user;
    }
    const error = Error('bad user');
    error.status = 401;
    throw error;
  }
  catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};


User.authenticate = async({ email, password })=> {
  const user = await User.findOne({
    where: {
      email,
    }
  });
  // check if user was found and plaintext password matches hashed pw
  if (user && bcrypt.compare(password, user.password)){
    //anyone can see what's in token but not read
    const token = jwt.sign({userID: user.id }, SECRET_KEY);
    // console.log('token:', token)
    return token;
  }
  const error = Error('bad authentication');
  error.status = 401;
  throw error;
};

module.exports = {
  db,
  User,
  Order,
  Product,
  Review
}
