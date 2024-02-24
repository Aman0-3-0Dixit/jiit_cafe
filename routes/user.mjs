// routes/user.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users.mjs';
import authenticateToken from '../middleware/auth.mjs'; // Import the middleware

const router = express.Router();

router.get('/details', authenticateToken, async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Access denied - Authorization header missing' });
  }
  const token = req.headers.authorization.split(' ')[1];
  console.log('Received Token:', token);
  // The user information is now available in req.user
  const userId = req.user.userId;
  console.log('User ID:', userId);

  try {
    // Fetch user details based on the user ID
    const user = await User.findById(userId);

    if (user) {
      // Send user details as the response
      res.status(200).json({
        _id: user._id,
        name: user.name,
        enrollmentNo: user.enrollmentNo,
        jCoins: user.jCoins,
        successfulOrders: user.successfulOrders,
        failedOrders: user.failedOrders,
        pendingOrders: user.pendingOrders,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
