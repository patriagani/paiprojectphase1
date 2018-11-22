const routes = require('express').Router();
const SellerController = require('../controllers/SellerController.js')
const BuyerController = require('../controllers/BuyerController.js')

routes.get('/', function(req,res) {
  res.render('signin')
})

routes.post('/seller', SellerController.signin)

routes.post('/buyer', BuyerController.signin)




module.exports = routes;