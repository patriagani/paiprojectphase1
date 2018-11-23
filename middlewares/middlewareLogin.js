let middlewareLogin = function(req, res, next){
  if (!req.session.user) {
    res.redirect('/signin')
  }
  else {
    next()
  }
}

module.exports = middlewareLogin