const Model = require('../models')
const Buyer = Model.Buyer
const Transaction = Model.Transaction
const Stall = Model.Stall
const Seller = Model.Seller
const {checkHash} = require('../helpers')

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
    Buyer.findOne({where: {email: req.body.email}})
      .then(function(data) {
        if (data) {
          if (checkHash(req.body.password, data.password)) {
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
        if (!req.session.user || req.session.user.role !== "Buyer") {
          // res.redirect('/')
          res.send('harap login sebagai buyer')
        }
        else {
          res.render('order-confirmation', {data: dataStall})
        }
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static orderService(req, res) {
    let obj = {
      StallId: req.params.stallId,
      BuyerId: req.session.user.id,
      SellerId: req.params.sellerId,
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

  static buyerPage(req, res) {
    if (!req.session.user || req.session.user.role !== "Buyer") {
      res.send('harap login sebagai buyer')
    }
    else {
      let transaction = {}
      transaction.buyerName = req.session.user.name
      Transaction.findAll({include: [{ model: Stall}, { model: Seller}], where: {BuyerId: req.session.user.id, status: "Pending"}})
      .then(function(transactionPending) {
        transaction.pending = transactionPending
        return Transaction.findAll({include: [{ model: Stall}, { model: Seller}], where: {BuyerId: req.session.user.id, status: "On Process"}})
      })
      .then(function(transactionProcess) {
        transaction.process = transactionProcess
        return Transaction.findAll({include: [{ model: Stall}, { model: Seller}], where: {BuyerId: req.session.user.id, status: "Done"}})
      })
      .then(function(transactionDone) {
        transaction.done = transactionDone
      })
      .then(function() {
        // res.send(transaction)
        res.render('buyer', {data: transaction})
      })
      .catch(function(err) {
        res.send(err.message)
      })
    }
  }
}

module.exports = BuyerController