// models/user.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  // Add more fields as needed
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollmentNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jCoins: { type: Number, default: 0 }, // Initial JCoins value is set to 0
  successfulOrders: { type: [orderSchema], default: [] }, // Default to an empty array
  failedOrders: { type: [orderSchema], default: [] }, // Default to an empty array
  pendingOrders: { type: [orderSchema], default: [] }, // Default to an empty array
});

const User = mongoose.model('User', userSchema);

export default User;

