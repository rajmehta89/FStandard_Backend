import express from 'express';
import contactController from '../controllers/contactController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all contact routes
router.use(verifyToken);

router.post('/', contactController.createContactMessage);

export default router;

