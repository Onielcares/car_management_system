import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

interface IDBConfig {
  uri: string;
  options: mongoose.ConnectOptions;
}

const dbConfig: IDBConfig = {
  uri: process.env.MONGODB_URI as string,
  options: {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  }
};

export default dbConfig;