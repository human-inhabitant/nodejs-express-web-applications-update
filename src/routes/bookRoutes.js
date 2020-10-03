const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
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
    });
  bookRouter.route('/:id')
    .get((req, res) => {
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
    });
  return bookRouter;
}

module.exports = router;
