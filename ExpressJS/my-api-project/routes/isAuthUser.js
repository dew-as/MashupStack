// for generating secret key
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const isAuthUser = {
  generateSecretKey: () => {
    return crypto.randomBytes(32).toString('hex');
  },
  varifyToken: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.userId = decoded.userId;
      req.userRole = decoded.role;
      next();
    });
    next()
  },
  varifyTokenAdmin: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json({ message: 'Forbidden error' });
      }
      // Convert role to lowercase for comparison
      if (decoded.userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.userId = decoded.userId;
      req.userRole = decoded.userRole;
      next();
    });
    next()
  },
};

module.exports = isAuthUser;