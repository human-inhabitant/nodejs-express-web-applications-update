const express = require('express');
const bookController = require('../controllers/bookController');

function router(nav) {
  const bookRouter = express.Router();
  const { getIndex, getById, middleware } = bookController(nav);
  bookRouter.use(middleware);
  bookRouter.route('/').get(getIndex);
  bookRouter.route('/:id').get(getById);
  return bookRouter;
}

module.exports = router;
