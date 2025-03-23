const express = require('express');
const morgan = require('morgan');
require('./database');
const path = require('path');
const app = express();
const port = process.env.PORT || 3004;
const index = require('./routes');
const api = require('./routes/api');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('short')); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(index);

app.listen(port);