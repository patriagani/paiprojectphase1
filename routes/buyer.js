const routes = require('express').Router();
const SellerController = require('../controllers/SellerController.js')
const BuyerController = require('../controllers/BuyerController.js')

routes.get('/', BuyerController.buyerPage)


module.exports = routes;