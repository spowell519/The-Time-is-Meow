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
    //empty/null??
  },
  isAdmin: {
    type: Sequelize.STRING,
    defaultValue: false,
    validate: {
      isIn: [[true, false]]
    }
  }
})
