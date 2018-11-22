const app = require('express')();
const express = require('express');
const session = require('express-session')
const routes = require('./routes');
const signup = require('./routes/signup.js');
const signin = require('./routes/signin.js');
const service = require('./routes/service.js')
const seller = require('./routes/seller.js')
const buyer = require('./routes/buyer.js')
const transaction = require('./routes/transaction.js')


app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(session({secret: 'pazano'}));

app.use('/', routes);
app.use('/signup', signup)
app.use('/signin', signin)
app.use('/service', service)
app.use('/seller', seller)
app.use('/buyer', buyer)
app.use('/transaction', transaction)


app.listen(3000, function() {
  console.log('App listening on port 3000');
})