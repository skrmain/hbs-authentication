const { Router } = require('express');

const UserModel = require('./models/User.model');
const User = require('./models/User.model');

const router = Router();

router.get('/', async (req, res) => {
  // TODO:
  // console.log(req.cookies);
  // console.log(req.session.cookie);
  if (req.session.userId) {
    const user = await User.findOne({ _id: req.session.userId });

    res.render('index', { user });
  } else {
    // res.redirect('/login');
    res.render('index');
  }
});

router.get('/register', async (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  console.log('req.body', req.body);
  const u = new UserModel();
  u.name = req.body.name;
  u.email = req.body.email;
  // TODO: Password Encryption
  u.password = req.body.password;

  await u.save();

  res.redirect('/login');
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  console.log('req.body', req.body);
  // 1- Check if email and password exists in DB
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    // Session, Cookies(key)
    req.session.userId = user._id;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', async (req, res) => {
  req.session.userId = null;
  res.redirect('/');
});

module.exports = router;
