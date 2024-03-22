import express from 'express';
import noteRoutes from './noteRoutes.js';
import userRoutes from './userRoutes.js'; // Import userRoutes


const router = express.Router();



// Use noteRoutes at /api/notes endpoint
router.use('/notes', noteRoutes);

// Use userRoutes at /api/users endpoint
router.use('/users', userRoutes);

export default router;
