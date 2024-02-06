const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config({ path: 'development.env' });

const AuthRoutes = require('./auth.routes');

const app = express();
const port = 3000;

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'test' });
  console.log('DB Connected');

  app.use(
    session({
      // TODO:
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    })
  );

  app.set('view engine', 'hbs');
  app.set('views', './src/views');

  //   app.use(express.json()); // fof API
  app.use(express.urlencoded({ extended: true })); // for html form
  app.use('/', AuthRoutes);

  app.listen(port, () => console.log(`Listening on port ${port}`));
}

main().catch((err) => console.log(err));
