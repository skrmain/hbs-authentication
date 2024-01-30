const { Router } = require('express');

const UserModel = require('./models/User.model');

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

module.exports = router;
