const debug = require('debug')('app:bookController');
const { MongoClient, ObjectID } = require('mongodb');

function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to MongoDB...');
        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.find().toArray();
        res.render('bookListView', {
          nav,
          title: 'My Library',
          books
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to MongoDB...');
        const db = client.db(dbName);
        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });
        book.details = await bookService.getBookById(book.bookId);
        debug(book);
        res.render('bookView', {
          nav,
          title: 'My Library',
          book
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    //   res.redirect('/');
    // }
  }
  return { getIndex, getById, middleware };
}

module.exports = bookController;
