import config from '../';

export default {
  uri: config.MONGODB_URI,
  options: {
    autoIndex: config.NODE_ENV !== 'production',
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000, 
    family: 4 
  }
};