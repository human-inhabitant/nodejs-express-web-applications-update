const express = require('express');

function router(nav) {
  const authorRouter = express.Router();
  authorRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  authorRouter.route('/').get((req, res) => {
    res.render('authorsView', {
      nav,
      title: 'My Library'
    });
  });
  return authorRouter;
}

module.exports = router;
