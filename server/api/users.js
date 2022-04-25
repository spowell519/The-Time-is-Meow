const router = require('express').Router();
// const Product = require('../db/Product')
const { User } = require('../db');

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.get('/auth/me', async (req, res, next) => {
  try {
    res.send(await User.byToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const editUser = await User.findByPk(req.params.id);
    res.send(await editUser.update(req.body));
  } catch (err) {
    next(err);
  }
});


module.exports = router;
