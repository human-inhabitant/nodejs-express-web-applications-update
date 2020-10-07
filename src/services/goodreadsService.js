const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadsService');
const apiKeys = require('../config/config')();

const parser = xml2js.Parser({ explicitArray: false });

function goodReadsService() {
  function getBookById(bookId) {
    return new Promise((resolve, reject) => {
      const url = `https://www.goodreads.com/book/show/${bookId}.xml?key=${apiKeys.goodReads.key}`;
      axios.get(url)
        .then((response) => {
          parser.parseString(response.data, (error, result) => {
            if (error) {
              debug(error);
            } else {
              // debug(result.GoodreadsResponse.book);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  return { getBookById };
}

module.exports = goodReadsService();
