const Model = require('../models')
const Seller = Model.Seller
const Stall = Model.Stall
const Buyer = Model.Buyer
const Transaction = Model.Transaction
const {checkHash} = require('../helpers')

class SellerController {
  static create(req, res) {
    let obj = {
      username  : req.body.username,
      name      : req.body.name,
      email     : req.body.email ,
      password  : req.body.password
    }
    Seller.create(obj)
      .then(function(data) {
        res.redirect('/')
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static sellerPage(req, res) {
    if (!req.session.user || req.session.user.role !== "Seller") {
      res.send('harap login sebagai seller')
    }
    else {
      let transaction = {}
      transaction.sellerName = req.session.user.name
      Transaction.findAll({include: [{ model: Buyer}, { model: Stall}], where: {SellerId: req.session.user.id, status: "Pending"}})
      .then(function(transactionPending) {
        transaction.pending = transactionPending
        return Transaction.findAll({include: [{ model: Buyer}, { model: Stall}], where: {SellerId: req.session.user.id, status: "On Process"}})
      })
      .then(function(transactionProcess) {
        transaction.process = transactionProcess
        return Transaction.findAll({include: [{ model: Buyer}, { model: Stall}], where: {SellerId: req.session.user.id, status: "Done"}})
      })
      .then(function(transactionDone) {
        transaction.done = transactionDone
      })
      .then(function() {
        // res.send(transaction)
        res.render('seller', {data: transaction})
      })
      .catch(function(err) {
        res.send(err.message)
      })
    }
  }

  static signin(req, res) {
    Seller.findOne({where: {email: req.body.email}})
      .then(function(data) {
        if (data) {
          if (checkHash(req.body.password, data.password)) {
            req.session.user = {
              id: data.id,
              role: "Seller",
              email: req.body.email,
              username: data.username,
              name: data.name
            }
            res.redirect('/seller')
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

  static addService(req, res) {
    let obj = {
      SellerId: req.session.user.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      CategoryId: req.body.CategoryId
    }
    console.log(obj);
    Stall.create(obj)
      .then(function() {
        res.send(`sukses bikin lapak jasa`)
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static acceptOrder(req, res) {
      let obj = {
        status: "On Process"
      }
    Transaction.update(obj, {where: {id: req.params.serviceId}})
      .then(function() {
        res.redirect('/seller')
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static declineOrder(req, res) {
    Transaction.destroy({where: {id: req.params.serviceId}})
      .then(function() {
        res.redirect('/seller')
      })
      .catch(function(err) {
        res.send(err)
      })
  }
}

module.exports = SellerController