const authMiddleware = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'Yetkisiz erişim!' });
  }
  next();
};

module.exports = authMiddleware;
