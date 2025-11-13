import { sendSuccess } from '../utils/response.js';

const getHealth = async (req, res, next) => {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    };

    return sendSuccess(res, healthData, 'Health check successful', 200);
  } catch (error) {
    next(error);
  }
};

export default {
  getHealth,
};

