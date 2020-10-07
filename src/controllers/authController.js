const debug = require('debug')('app:authController');
const { MongoClient } = require('mongodb');

function authController(nav) {
  function postSignUp(req, res) {
    const { username, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to MongoDB...');
        const db = client.db(dbName);
        const col = await db.collection('users');
        const user = { username, password };
        const results = await col.insertOne(user);
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getSignIn(req, res) {
    res.render('signin', {
      nav, title: 'Sign In'
    });
  }
  function middleWare(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
  function getProfile(req, res) {
    res.render('profileView', {
      nav, title: 'Profile', user: req.user
    });
  }
  function getLogOut(req, res) {
    req.logout();
    res.redirect('/');
  }
  return {
    postSignUp, getSignIn, middleWare, getProfile, getLogOut
  };
}

module.exports = authController;
