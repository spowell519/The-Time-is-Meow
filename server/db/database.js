const Sequelize = require('sequelize')

const db = new Sequelize(`postgres://localhost:5432/theTimeIsMeow`, {
  logging: false
})

module.exports = db
