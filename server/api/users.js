const router = require('express').Router();
// const Product = require('../db/Product')
const { User } = require('../db/');

const requireToken = async(req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err)
  }
}

router.post('/auth', async(req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  }
  catch (err){
    next(err);
  }
});

router.get('/auth', requireToken, async(req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    res.send(user);
  }
  catch (err) {
    next(err);
  }
});

// in future have /user/:id ... to go to logged in user page

// router.delete('/auth', async(req, res, next) => {
//   try {
//     res.send();
//   }
//   catch (err) {
//     next(err);
//   }
// });

module.exports = router
