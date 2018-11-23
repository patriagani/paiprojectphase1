const routes = require('express').Router();
const SellerController = require('../controllers/SellerController.js')
const BuyerController = require('../controllers/BuyerController.js')
const middlewareLogin = require('../middlewares/middlewareLogin.js')

routes.get('/', middlewareLogin, BuyerController.buyerPage)


module.exports = routes;