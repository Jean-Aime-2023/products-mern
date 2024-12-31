import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI);
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    console.log(connect.connection.host);
  } catch (error) {
    console.log(error);
  }
};
