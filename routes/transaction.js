const routes = require('express').Router();
const SellerController = require('../controllers/SellerController.js')
const BuyerController = require('../controllers/BuyerController.js')
const TransactionController = require('../controllers/TransactionController.js')


routes.get('/detail/:transactionId', TransactionController.getDetailPage)

routes.post('/detail/:transactionId', TransactionController.postComment)

routes.post('/done/:transactionId', TransactionController.done)

module.exports = routes;