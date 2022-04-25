'use strict'

const { db } = require('./server/db')
const app = require('./server')
const PORT = process.env.PORT || 1337;
const HOST = process.env.HOST || '0.0.0.0';

db.sync()
  .then(() => {
    console.log('db synced')
    app.listen(PORT, HOST, () => console.log(`Hosted on ${HOST} & studiously serving silly sounds on port ${PORT}`))
  })
