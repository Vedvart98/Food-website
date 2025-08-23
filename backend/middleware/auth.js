const jwt = require('jsonwebtoken');
const User = require('../models/User');

// protect routes - verify jwt token
exports.protect = async (req, res, next) => {
  try {
    // 1)getting token and check if it exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token === 'loggedout') {
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in! Please login to get access'
      })
    }

    // 2)verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3)check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists'
      });
    }

    // 4) check if user is active
    if (!currentUser.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Your account has been deactivated.'
      });

    }
    // Grant access to protected route
    req.user = decoded;
    req.currentUser = currentUser;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token. Please log in again!'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Your token has expired! Please log in again.'
      });
    }
    console.error('AUTH MIDDLEWARE ERROR:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

// Restrict to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

// Optional authentication - doesn't fail if no token
exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token === 'loggedout') {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.userId);

    if (currentUser && currentUser.isActive) {
      req.user = decoded;
      req.currentUser = currentUser;
    }

    next();
  } catch (error) {
    return next();
  }
};