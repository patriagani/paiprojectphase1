const routes = require('express').Router();
const SellerController = require('../controllers/SellerController.js')
const BuyerController = require('../controllers/BuyerController.js')
const StallController = require('../controllers/StallController.js')

routes.get('/', StallController.renderService)

routes.get('/add-service', function(req, res) {
  if (!req.session.user || req.session.user.role !== "Seller") {
    // res.redirect('/')
    res.send('harap login sebagai seller')
  }
  else {
    res.render('add-service')
  }
})

routes.post('/add-service', SellerController.addService)

routes.get('/:serviceId', StallController.serviceDetail)

routes.get('/:stallId/order', BuyerController.preOrderService)
routes.get('/:stallId/order/processed/:sellerId', BuyerController.orderService)

routes.get('/:serviceId/accept', SellerController.acceptOrder)
routes.get('/:serviceId/decline', SellerController.declineOrder)

routes.get('/category/:categoryId', StallController.category)



module.exports = routes;