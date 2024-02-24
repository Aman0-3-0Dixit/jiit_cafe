// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users.mjs';

const router = express.Router();

// Secret key for signing JWT tokens
const JWT_SECRET = 'helloworld';

// Signup route
router.post('/signup', async (req, res) => {
  const { name, enrollmentNo, password } = req.body;

  try {
    const existingUser = await User.findOne({ enrollmentNo });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      name,
      enrollmentNo,
      password,
    });

    // Set default values for additional fields
    newUser.jCoins = 0;
    newUser.successfulOrders = [];
    newUser.failedOrders = [];
    newUser.pendingOrders = [];

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Signin route
router.post('/signin', async (req, res) => {
  console.log('Received request at /signin');
  const { enrollmentNo, password } = req.body;

  try {
    const user = await User.findOne({ enrollmentNo, password });
    if (user) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      console.log('Token generated:', token);
      
      // Send additional user details and the token
      const { _id, name, jCoins, successfulOrders, failedOrders, pendingOrders } = user;
      res.status(200).json({
        message: 'Login successful',
        user: { _id, name, enrollmentNo, jCoins, successfulOrders, failedOrders, pendingOrders },
        token,
      });

    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/checkUser/:enrollmentNo', async (req, res) => {
  try {
    const enrollmentNo = req.params.enrollmentNo;
    const user = await User.findOne({ enrollmentNo });

    if (user) {
      // User found
      res.status(200).json({ exists: true, user });
    } else {
      // User not found
      res.status(404).json({ exists: false, message: 'User not found' });
    }
  } catch (error) {
    console.log('here');
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
