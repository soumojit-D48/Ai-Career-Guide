

// // routes/authRoutes.js

// import express from "express";
// import {
//   syncUser,
//   getMe,
//   updateProfile,
//   deleteAccount,
//   handleClerkWebhook
// } from '../controllers/authControllers.js'
// import { requireAuth, verifyClerkWebhook } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // @route   POST /api/auth/sync
// // @desc    Sync user from frontend (create or update user in DB)
// // @access  Public
// router.post("/sync", syncUser);

// // @route   POST /api/auth/webhooks/clerk
// // @desc    Handle Clerk webhooks (user.created, user.updated, user.deleted)
// // @access  Public (but verified with webhook signature)
// router.post("/webhooks/clerk", verifyClerkWebhook, handleClerkWebhook);

// // ============================================
// // PROTECTED ROUTES (Require authentication)
// // ============================================

// // @route   GET /api/auth/me
// // @desc    Get current user profile and data
// // @access  Private
// router.get("/me", requireAuth, getMe);

// // @route   PUT /api/auth/profile
// // @desc    Update user profile (name, avatar)
// // @access  Private
// router.put("/profile", requireAuth, updateProfile);

// // @route   DELETE /api/auth/account
// // @desc    Delete user account permanently
// // @access  Private
// router.delete("/account", requireAuth, deleteAccount);

// export default router;
















// routes/authRoutes.js

import express from "express";
import {
  syncUser,
  getMe,
  updateProfile,
  deleteAccount,
  handleClerkWebhook,
  resetJourney,
  getStats
} from '../controllers/authControllers.js';
import { requireAuth, verifyClerkWebhook } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// @route   POST /api/auth/sync
// @desc    Sync user from frontend (create or update user in DB)
// @access  Public
router.post("/sync", syncUser);

// @route   POST /api/auth/webhooks/clerk
// @desc    Handle Clerk webhooks (user.created, user.updated, user.deleted)
// @access  Public (but verified with webhook signature)
router.post("/webhooks/clerk", verifyClerkWebhook, handleClerkWebhook);

// ============================================
// PROTECTED ROUTES (Require authentication)
// ============================================

// @route   GET /api/auth/me
// @desc    Get current user profile and data
// @access  Private
router.get("/me", requireAuth, getMe);
// router.get("/me", getMe);

// @route   GET /api/auth/stats
// @desc    Get user statistics and progress
// @access  Private
router.get("/stats", requireAuth, getStats);

// @route   PUT /api/auth/profile
// @desc    Update user profile (name, avatar)
// @access  Private
router.put("/profile", requireAuth, updateProfile);

// @route   POST /api/auth/reset-journey
// @desc    Reset user's entire learning journey
// @access  Private
router.post("/reset-journey", requireAuth, resetJourney);

// @route   DELETE /api/auth/account
// @desc    Delete user account permanently
// @access  Private
router.delete("/account", requireAuth, deleteAccount);

export default router;