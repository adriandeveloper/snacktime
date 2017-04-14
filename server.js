'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
require('ejs');
require('locus');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('statics/home');
})







app.listen(port, () => {
  console.log('Now Listening on port ' + port);
})
