

import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import {
  getStage1Quiz,
  submitStage1Quiz,
  getStage2Data,
  submitStage2Selection,
  getRoadmap,
  getStage3Quiz,
  submitStage3Quiz,
  updateRoadmapProgress,
  resetJourney
} from "../controllers/quizControllers.js";

const router = express.Router();

// ==================== STAGE 1 ROUTES ====================

/**
 * GET /api/quiz/stage1
 * Get Stage 1 quiz (Initial Assessment)
 * Requires authentication
 */
// router.get("/stage1", getStage1Quiz);
router.get("/stage1", requireAuth, getStage1Quiz);

/**
 * POST /api/quiz/stage1/submit
 * Submit Stage 1 answers
 * Body: { quizId, answers: [{ questionId, question, answer }] }
 */
router.post("/stage1/submit", requireAuth, submitStage1Quiz);

// ==================== STAGE 2 ROUTES ====================

/**
 * GET /api/quiz/stage2
 * Get Stage 2 data (Career options + optional quiz)
 * Returns career options based on detected interest from Stage 1
 */
router.get("/stage2", requireAuth, getStage2Data);

/**
 * POST /api/quiz/stage2/submit
 * Submit Stage 2 career selection
 * Body: { 
 *   selectedCareer?: string,  // from options
 *   customCareer?: string,    // user typed
 *   quizAnswers?: [{ questionId, question, answer }]  // optional
 * }
 */
router.post("/stage2/submit", requireAuth, submitStage2Selection);

// ==================== STAGE 3 ROUTES ====================

/**
 * GET /api/quiz/stage3/roadmap
 * Get user's roadmap with progress
 */
router.get("/stage3/roadmap", requireAuth, getRoadmap);

/**
 * GET /api/quiz/stage3/quiz/:topic?
 * Get Stage 3 quiz for a specific topic or random
 * If topic not provided, returns random quiz for user's chosen career
 */
router.get("/stage3/quiz/:topic", requireAuth, getStage3Quiz);

/**
 * POST /api/quiz/stage3/submit
 * Submit Stage 3 quiz answers
 * Body: { quizId, answers: [{ questionId, answer }] }
 */
router.post("/stage3/submit", requireAuth, submitStage3Quiz);

/**
 * POST /api/quiz/stage3/roadmap/update
 * Update roadmap item progress
 * Body: { itemId, progress?: number, completed?: boolean }
 */
router.post("/stage3/roadmap/update", requireAuth, updateRoadmapProgress);

// ==================== RESET ROUTE ====================

/**
 * POST /api/quiz/reset
 * Reset user's entire journey back to Stage 1
 */
router.post("/reset", requireAuth, resetJourney);

// ==================== USER STATUS ROUTE ====================

/**
 * GET /api/quiz/status
 * Get current user status and progress
 */
router.get("/status", requireAuth, async (req, res) => {
  try {
    const { userId } = req.auth;
    const User = (await import("../models/User.js")).default;
    
    const user = await User.findOne({ clerkId: userId })
      .select('-quizAnswers') // Don't send all quiz answers
      .lean();

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({ 
      success: true,
      data: {
        currentStage: user.currentStage,
        stage1Completed: user.stage1Completed,
        stage2Completed: user.stage2Completed,
        detectedInterest: user.detectedInterest,
        chosenCareer: user.chosenCareer,
        chosenCareerLabel: user.chosenCareerLabel,
        roadmapGenerated: user.roadmapGenerated,
        stats: user.stats,
        level: user.level,
        xp: user.xp,
        badges: user.badges,
        journeyResets: user.journeyResets,
        lastQuizActivity: user.lastQuizActivity
      }
    });

  } catch (error) {
    console.error("Error in getUserStatus:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

export default router;