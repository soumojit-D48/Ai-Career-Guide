

import express from "express";
import  getUserProfile  from '../controllers/userController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET /api/user/profile
router.get("/profile", requireAuth, getUserProfile);

export default router;