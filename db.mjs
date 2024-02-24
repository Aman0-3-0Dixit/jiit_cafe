// db.mjs
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://aman98618:aman98618@cluster0.bnoqctp.mongodb.net/?retryWrites=true&w=majority&ssl=true', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
