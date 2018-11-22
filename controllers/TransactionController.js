const Model = require('../models')
const Stall = Model.Stall
const Seller = Model.Seller
const Review = Model.Review
const Comment = Model.Comment
const Transaction = Model.Transaction


class TransactionController {
  static getDetailPage(req, res) {
    let comment = []
    Comment.findAll({include: [{model: Transaction}], where: {TransactionId: req.params.transactionId }})
      .then(function(dataComment) {
        comment = dataComment
        return Transaction.findOne({include: [{model: Stall}], where: {id: req.params.transactionId }})
      })
      .then(function(dataTransaction) {
        res.render('transaction-detail-seller', {comment: comment, transaction: dataTransaction})
      })
      .catch(function(err) {
        res.send(err)
      })
  }

  static postComment(req, res) {
    let obj = {
      sender: req.session.user.name,
      TransactionId: req.params.transactionId,
      comment: req.body.comment
    }
    Comment.create(obj)
      .then(function() {
        res.redirect(`/transaction/detail/${req.params.transactionId}`)
      })
      .catch(function(err) {
        res.send(err)
      })
  }
}

module.exports = TransactionController