const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

function router(nav) {
  const authRouter = express.Router();
  const {
    postSignUp, getSignIn, middleWare, getProfile, getLogOut
  } = authController(nav);
  authRouter.route('/signUp').post(postSignUp);
  authRouter.route('/signin')
    .get(getSignIn)
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .all(middleWare)
    .get(getProfile);
  authRouter.route('/logout').get(getLogOut);
  return authRouter;
}

module.exports = router;
