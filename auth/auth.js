const auth = (req, res, next) => {
  if (req.session.usuario != undefined) {
    return next();
  }
  res.redirect('/login');
};

const adminAuth = (req, res, next) => {
  if (req.session.usuario != undefined) {
    if (req.session.usuario.admin) return next();
  }
  res.redirect('/login');
};

module.exports = {auth, adminAuth};
