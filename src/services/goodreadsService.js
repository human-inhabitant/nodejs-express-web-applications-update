const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadsService');

const parser = xml2js.Parser({ explicitArray: false });

function goodReadsService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      axios.get('https://www.goodreads.com/book/show/656.xml?key=cdJq2yNQBFl32nMswWbNA')
        .then((response) => {
          parser.parseString(response.data, (error, result) => {
            if (error) {
              debug(error);
            } else {
              debug(result.GoodreadsResponse.book);
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
