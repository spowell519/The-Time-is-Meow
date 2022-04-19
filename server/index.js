const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

const port = process.env.PORT || 3000
app.listen(port, function(){
  console.log(`right meow you're at port ${port}`)
})

//logging middleware
app.use(morgan('dev'))

//static middleware
app.use(express.static(path.join(__dirname, '../public')));

//body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//this will lead to our routes!
// app.use('api', require('./api'))

//sends index.html for non-api requests
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'))
})

//error handling middlware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app