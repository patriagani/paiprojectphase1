const routes = require('express').Router();
const SellerController = require('../controllers/SellerController.js')
const BuyerController = require('../controllers/BuyerController.js')

routes.get('/', function(req,res) {
  res.render('service')
})

routes.get('/add-service', SellerController.addService) 

routes.post('/add-service', SellerController.addService)


module.exports = routes;