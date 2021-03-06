const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name
console.log(chalk.yellow(`Opening database connection to ${dbName}`))

const db = process.env.NODE_ENV === 'production'
  ? new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  })
  : new Sequelize(`postgres://localhost:5432/${dbName}`, {
    logging: false,
  })

module.exports = db
