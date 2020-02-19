module.exports = (req, res, next) => {
  if(req.session.loggedin && (req.session.loggedin === true)) {
    next();
  }else {
    res.status(400).json({
      message: 'You shall not enter!'
    })
  }
}