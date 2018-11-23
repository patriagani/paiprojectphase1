const Model = require('../models')
const Stall = Model.Stall
const Seller = Model.Seller
const Review = Model.Review

class StallController {
  static renderService(req, res) {
    Stall.findAll({include: [{ model: Seller}]})
      .then(function(dataStall) {
        // res.send(dataStall)
        res.render('service', {data: dataStall})
      })
      .catch(function(err) {
        res.send(err.message)
      })
  }

  static category(req, res) {
    Stall.findAll({include: [{ model: Seller}], where: {id: req.params.categoryId}})
      .then(function(dataStall) {
        // res.send(dataStall)
        res.render('service', {data: dataStall})
      })
      .catch(function(err) {
        res.send(err.message)
      })
  }

  static serviceDetail(req, res) {
    Stall.findOne({include: [{model: Review}, {model: Seller}],where: {id: req.params.serviceId}})
    .then(function(dataStall) {
      // res.send(dataStall)
      res.render('service-detail', {data: dataStall})
    })
    .catch(function(err) {
      res.send(err)
    })
  }
}

module.exports = StallController