const AssignedTool = require('../models/AssignedTool')
const Admin = require("../models/Admin")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

module.exports = class AuthController {
  static async login(req, res, next) {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      const user = await Admin.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const payload = { userId: user._id }
      const secret = process.env.JWT_SECRET;
      const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); // Adjust expiration time for refresh token (longer than access token)


      res.json({ accessToken,refreshToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async checkAuth(req, res, next) {

    const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    return res.json({status:true})
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  }
}