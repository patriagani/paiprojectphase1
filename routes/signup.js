const routes = require('express').Router();
const SellerController = require('../controllers/SellerController.js')
const BuyerController = require('../controllers/BuyerController.js')

routes.get('/', function(req,res) {
  res.render('signup')
})

routes.post('/seller', SellerController.create)

routes.post('/buyer', BuyerController.create)

module.exports = routes;