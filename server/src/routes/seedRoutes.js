

import express from "express";
import {
  seedStage1Quiz,
  seedStage2Data,
  seedStage3QuizzesForCareer,
  seedAll,
  resetSeedData
} from "../controllers/seedController.js";

const router = express.Router();

/**
 * SEED ROUTES
 * These routes are for initial database setup and should be protected in production
 * Consider adding admin authentication middleware
 */

/**
 * POST /api/seed/stage1
 * Generate and save Stage 1 quiz (run once)
 */
router.post("/stage1", seedStage1Quiz);

/**
 * POST /api/seed/stage2
 * Generate and save Stage 2 quizzes and career options (run once)
 * This will generate data for all 5 interest categories: tech, creative, business, health, education
 */
router.post("/stage2", seedStage2Data);

/**
 * POST /api/seed/stage3/:career
 * Generate common Stage 3 quizzes for a specific career
 * Body: { topics: ["Topic 1", "Topic 2", ...] }
 * 
 * Example:
 * POST /api/seed/stage3/web-dev
 * Body: { topics: ["HTML Basics", "CSS Fundamentals", "JavaScript Basics"] }
 */
router.post("/stage3/:career", seedStage3QuizzesForCareer);

/**
 * POST /api/seed/all
 * Generate all initial data (Stage 1 and Stage 2)
 * WARNING: This can take 5-10 minutes and will consume API credits
 */
router.post("/all", seedAll);

/**
 * DELETE /api/seed/reset
 * Delete all AI-generated content (for testing only)
 * Body: { confirm: "DELETE_ALL" }
 */
router.delete("/reset", resetSeedData);

export default router;
