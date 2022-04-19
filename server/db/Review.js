const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('review', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      len: [6, 1000]
    }
  }
})
