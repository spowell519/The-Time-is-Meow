const Sequelize = require('sequelize');
const db = require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Order = require('./Order')
const Product = require('./Product')

const User = db.define('user', {
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

module.exports = User
const SECRET_KEY = process.env.JWT //currently ditched bc returning undefined

//AUTH METHODS

User.prototype.correctPassword = function (userPassword) {
  return bcrypt.compare(userPassword, this.password)
}

User.prototype.generateToken = function () {
  const token = jwt.sign({ id: this.id }, 'secret')
  return token
}


//CART METHODS
User.prototype.getCart = async function (){
  const where = {
    userId: this.id,
    status: 'CART'
  }
  let cart = await Order.findOne({
    where
  })
  if(!cart){
    cart = await Order.create(where);
  }
  return Order.findByPk(cart.id,
    {include: [
      {model: Product}
    ]})
}

User.prototype.addToCart = async function() {
  const cart = await this.getCart();
  console.log(cart)
}

User.prototype.removeFromCart = async function(product) {
  const cart = await this.getCart();
  console.log(cart, 'heres the cart', product, "here's the product")
  console.log(Product.id===product.id,Product.id, product.id, "figuring some stuff out")
  // const lineItem = cart.findOne(product.id === Product.id)
  // console.log(lineItem, 'removed')
  //lineItem.inventory--
}

User.byToken = async (token) => {
  try {
    const {id} = await jwt.verify(token, 'secret')
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (err) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
};

User.authenticate = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    }
  });
  // check if user was found and plaintext password matches hashed pw
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('bad authentication');
    error.status = 401;
    throw error;
  }
  return user.generateToken()

};


//HOOKS
User.beforeCreate(async (user) => {
  const hashedPW = await bcrypt.hash(
    user.password,
    10, // salt rounds
  );
  user.password = hashedPW;
  // stolen from stack overflow, also works:
  // user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
});
