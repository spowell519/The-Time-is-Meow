const router = require('express').Router()

router.use((req,res,next) => {
  const err = new Error('API ROUTE NOT FOUND');
  err.status = 404;
  next(err)
})
