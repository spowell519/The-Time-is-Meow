const Sequelize = require('sequelize');
const db = require('./database');

module.exports =  db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
})


