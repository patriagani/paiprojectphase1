const Model = require('../models')
const Buyer = Model.Buyer
const Transaction = Model.Transaction
const Stall = Model.Stall

class BuyerController {
  static create(req, res) {
    let obj = {
      username  : req.body.username,
      name      : req.body.name,
      email     : req.body.email ,
      password  : req.body.password
    }
    Buyer.create(obj)
      .then(function(data) {
        res.redirect('/')
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static signin(req, res) {
    Buyer.findOne({where: {email: req.body.email, password: req.body.password}})
      .then(function(data) {
        if (data) {
          req.session.user = {
            id: data.id,
            role: "Buyer",
            email: req.body.email,
            username: data.username,
            name: data.name
          }
          res.redirect('/buyer')
        }
        else {
          let message = `email atau password anda salah, coba ingat ingat`
          res.redirect(`/signin?msg=${message}`)
        }
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static preOrderService(req, res) {
    Stall.findOne({include: [{ model: Seller}], where: {id: req.params.stallId}})
      .then(function(dataStall) {
        res.render('order-confirmation', {data: dataStall})
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static orderService(req, res) {
    let obj = {
      StallId: req.params.stallId,
      BuyerId: req.session.user.id,
      status: "Pending",
      rating: 0
    }
    Transaction.create(obj)
      .then(function(data) {
        res.send(`pesanan diteruskan ke penjual jasa`)
      })
      .catch(function(err) {
        res.send(err)
      })
}

module.exports = BuyerController