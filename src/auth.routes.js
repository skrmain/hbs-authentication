const { Router } = require('express');

const UserModel = require('./models/User.model');
const User = require('./models/User.model');

const router = Router();

router.get('/', async (req, res) => {
  res.render('index');
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

  console.log('Form Submitted');
  res.render('index', { message: 'Form Submitted' });
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
    // Cookies(key), Session
    // req.session
    // req.cookies
    res.render('index', { message: 'Login Successful', userName: user.name });
  } else {
    res.render('index', { message: 'Incorrect Email or Password' });
  }
});

module.exports = router;
