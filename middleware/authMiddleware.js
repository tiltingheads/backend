const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }

    req.user = user;  // Attach decoded user payload to req.user
    console.log("Decoded User: ", user);  // Debugging

    // Check for admin role if needed
    if (user.role === 'admin' && user.userId) {
      req.user.id = user.userId;  // Ensure admin access is by userId
    } else if (!user.id) {
      return res.status(403).json({ message: 'Unauthorized: Missing user ID' });
    }

    next();
  });
};

module.exports = authenticateToken;
