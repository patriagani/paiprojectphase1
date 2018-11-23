const routes = require('express').Router();
const SellerController = require('../controllers/SellerController.js')
const BuyerController = require('../controllers/BuyerController.js')

routes.get('/', function(req,res) {
  req.session.user = {}
  res.redirect('/')
})


module.exports = routes;