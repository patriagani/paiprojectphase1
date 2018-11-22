const Model = require('../models')
const Seller = Model.Seller
const Stall = Model.Stall

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

  static signin(req, res) {
    Seller.findOne({where: {email: req.body.email, password: req.body.password}})
      .then(function(data) {
        if (data) {
          res.redirect('/')
        }
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static signin(req, res) {
    Seller.findOne({where: {email: req.body.email, password: req.body.password}})
      .then(function(data) {
        if (data) {
          req.session.user = {
            id: data.id,
            role: "Seller",
            email: req.body.email,
            username: data.username,
            name: data.name
          }
          console.log(req.session.user);
          res.redirect('/')
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

  }
}

module.exports = SellerController