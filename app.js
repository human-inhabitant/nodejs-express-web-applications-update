/* eslint-disable no-console */
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3e3;
const config = {
  user: 'pslibrary',
  password: 'U!8$5KZg3^QyhoDE',
  server: 'ps-library.database.windows.net',
  database: 'ps-library',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

sql.connect(config).catch((err) => debug(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }
    ],
    title: 'My Library'
  });
});

app.server = app.listen(port, () => {
  debug(`Start: ${chalk.blackBright(new Date())}`);
  debug(`Listening on port: ${chalk.blackBright(port)}`);
});
