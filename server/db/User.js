const Sequelize = require('sequelize');
const db = require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

User.prototype.correctPassword = function (userPassword) {
  return bcrypt.compare(userPassword, this.password)
}

User.prototype.generateToken = function () {
  const token = jwt.sign({ id: this.id }, 'secret')
  return token
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


User.beforeCreate(async (user) => {
  const hashedPW = await bcrypt.hash(
    user.password,
    10, // salt rounds
  );
  user.password = hashedPW;
  // stolen from stack overflow, also works:
  // user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
});
