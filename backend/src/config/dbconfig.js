const DBString = "mongodb+srv://torahul1709:mLCpfK16jzTGrm7y@cluster0.hs9rren.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const mongoose = require('mongoose');

async function connectToMongo() {
    try {
      await mongoose.connect(DBString, {
      });
      console.log('MongoDB connected successfully!');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
  
  connectToMongo();
  