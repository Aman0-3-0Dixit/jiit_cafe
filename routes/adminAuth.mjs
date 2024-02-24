// routes/adminAuth.mjs

import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admins.mjs';

const router = express.Router();

const JWT_ADMIN_SECRET = 'helloworld';

router.post('/signIn', async (req, res) => {
  console.log('inside admin signup route');
  const { adminNo, password } = req.body;
  console.log('adminNo:', adminNo);
  console.log('password:', password);
  try {
    const admin = await Admin.findOne({ adminNo, password });
    if (admin) {
      // Generate JWT token for admin
      const token = jwt.sign({ adminId: admin._id }, JWT_ADMIN_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Admin login successful',
        admin: { adminId: admin._id, adminNo: admin.adminNo },
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
