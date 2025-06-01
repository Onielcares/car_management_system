import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


interface EnvConfig {
  NODE_ENV: 'development' | 'staging' | 'production';
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  // Add other environment variables here as needed
}

// Validate and export the configuration
const config: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV as EnvConfig['NODE_ENV'] || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  LOG_LEVEL: (process.env.LOG_LEVEL as EnvConfig['LOG_LEVEL']) || 'info',
  // Add other environment variables here
};

// Validation function (optional but recommended)
const validateConfig = (cfg: EnvConfig) => {
  if (!cfg.MONGODB_URI) {
    throw new Error('MONGODB_URI is required in environment variables');
  }
  if (!cfg.JWT_SECRET) {
    throw new Error('JWT_SECRET is required in environment variables');
  }
  return cfg;
};

// Export the validated configuration
export default validateConfig(config);