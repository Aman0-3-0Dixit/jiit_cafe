import mongoose from 'mongoose';
import User from './models/users.mjs';

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb+srv://aman98618:aman98618@cluster0.bnoqctp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function generateUsers() {
  const users = [];

  for (let i = 1; i <= 1000; i++) {
    const user = {
      name: `User ${i}`,
      enrollmentNo: `EN${i}`,
      password: `password${i}`,
      jCoins: 0,
      successfulOrders: [],
      failedOrders: [],
      pendingOrders: [],
    };
    
    User.insertMany(user);
    users.push(user);
  }


}

async function disconnectFromMongoDB() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}

// Main execution
(async () => {
  await connectToMongoDB();
  await generateUsers();
  //await disconnectFromMongoDB();
})();
