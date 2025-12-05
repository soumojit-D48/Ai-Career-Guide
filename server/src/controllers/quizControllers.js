

// quizController.js
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import CareerOptions from "../models/CareerOptions.js";
import Roadmap from "../models/Roadmap.js";
// import { geminiAPI } from "../service/geminiService.js";

import { openrouterAPI as geminiAPI } from "../service/openaiService.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// ==================== STAGE 1 ====================

/**
 * GET /api/quiz/stage1
 * Get Stage 1 quiz (Initial Assessment)
 */
export const getStage1Quiz = async (req, res) => {
  try {
    const { userId } = req.auth; // From Clerk middleware

    // Check if user exists
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if already completed Stage 1
    if (user.stage1Completed) {
      return res.status(400).json({
        success: false,
        message: "Stage 1 already completed",
        currentStage: user.currentStage
      });
    }

    // Get Stage 1 quiz
    const quiz = await Quiz.getStage1Quiz();

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Stage 1 quiz not found. Please contact admin."
      });
    }

    // Don't send correct answers to frontend
    const sanitizedQuiz = {
      _id: quiz._id,
      stage: quiz.stage,
      title: quiz.title || "Initial Interest Assessment",
      description: quiz.description || "Help us understand your interests",
      estimatedTime: quiz.estimatedTime,
      questions: quiz.questions.map(q => ({
        questionId: q.questionId,
        question: q.question,
        options: q.options,
        type: q.type,
        allowText: q.allowText
      }))
    };

    res.json({
      success: true,
      quiz: sanitizedQuiz
    });

  } catch (error) {
    console.error("Error in getStage1Quiz:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * POST /api/quiz/stage1/submit
 * Submit Stage 1 answers and get AI analysis
 */
export const submitStage1Quiz = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { quizId, answers } = req.body;

    // Validate input
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Answers are required"
      });
    }

    // Get user
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if already completed
    if (user.stage1Completed) {
      return res.status(400).json({
        success: false,
        message: "Stage 1 already completed"
      });
    }

    // Get quiz to validate
    const quiz = await Quiz.findById(quizId);
    if (!quiz || quiz.stage !== 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz"
      });
    }

    // Store answers
    const formattedAnswers = answers.map(ans => ({
      stage: 1,
      quizId: quiz._id,
      questionId: ans.questionId,
      question: ans.question,
      answer: ans.answer,
      answeredAt: new Date()
    }));

    user.quizAnswers.push(...formattedAnswers);

    // AI ANALYSIS - Detect interest category
    const analysisPrompt = `Analyze these quiz answers and determine the user's primary interest category.

Answers:
${answers.map((a, i) => `${i + 1}. Q: ${a.question}\n   A: ${a.answer}`).join('\n\n')}

Categories to choose from:
- tech: Technology, programming, software, AI, data
- creative: Design, art, content creation, media, writing
- business: Entrepreneurship, marketing, sales, management
- health: Healthcare, fitness, wellness, medicine
- education: Teaching, training, academic research

Return ONLY ONE category name (tech/creative/business/health/education) that best matches the user's interests based on their answers. No explanation, just the category name.`;

    const aiResponse = await geminiAPI.analyzeInterest(analysisPrompt);
    const detectedInterest = aiResponse.trim().toLowerCase();

    // Validate AI response
    const validInterests = ["tech", "creative", "business", "health", "education"];
    if (!validInterests.includes(detectedInterest)) {
      throw new Error("Invalid interest category detected by AI");
    }

    // Update user
    user.detectedInterest = detectedInterest;
    user.stage1Completed = true;
    user.currentStage = 2;
    user.lastQuizActivity = new Date();

    await user.save();

    // Get career options for next stage
    const careerOptions = await CareerOptions.getOptionsByInterest(detectedInterest);

    res.json({
      success: true,
      message: "Stage 1 completed successfully",
      data: {
        detectedInterest,
        currentStage: 2,
        careerOptions: careerOptions ? {
          interest: careerOptions.interestLabel,
          description: careerOptions.interestDescription,
          options: careerOptions.options
        } : null
      }
    });

  } catch (error) {
    console.error("Error in submitStage1Quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit quiz",
      error: error.message
    });
  }
};

// ==================== STAGE 2 ====================

/**
 * GET /api/quiz/stage2
 * Get Stage 2 data (Career options + Quiz)
 */
export const getStage2Data = async (req, res) => {
  try {
    const { userId } = req.auth;

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if Stage 1 is completed
    if (!user.stage1Completed || !user.detectedInterest) {
      return res.status(400).json({
        success: false,
        message: "Please complete Stage 1 first",
        currentStage: user.currentStage
      });
    }

    // Check if Stage 2 already completed
    if (user.stage2Completed) {
      return res.status(400).json({
        success: false,
        message: "Stage 2 already completed",
        currentStage: user.currentStage
      });
    }

    // Get career options
    const careerOptions = await CareerOptions.getOptionsByInterest(user.detectedInterest);

    if (!careerOptions) {
      return res.status(404).json({
        success: false,
        message: "Career options not found for your interest"
      });
    }

    // Get Stage 2 quiz (optional, for more refined selection)
    const quiz = await Quiz.getStage2Quiz(user.detectedInterest);

    const responseData = {
      detectedInterest: user.detectedInterest,
      interestLabel: careerOptions.interestLabel,
      interestDescription: careerOptions.interestDescription,
      careerOptions: careerOptions.options,
      stage2Question: careerOptions.stage2Question || "Which career path interests you most?"
    };

    // If quiz exists, include it
    if (quiz) {
      responseData.quiz = {
        _id: quiz._id,
        stage: quiz.stage,
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions.map(q => ({
          questionId: q.questionId,
          question: q.question,
          options: q.options,
          type: q.type,
          allowText: q.allowText
        }))
      };
    }

    // Store presented options in user document
    user.stage2PresentedOptions = careerOptions.options.map(opt => ({
      value: opt.value,
      label: opt.label,
      description: opt.description
    }));
    await user.save();

    res.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error("Error in getStage2Data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * POST /api/quiz/stage2/submit
 * Submit Stage 2 career selection (with optional quiz answers)
 */


export const submitStage2Selection = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { selectedCareer, customCareer, quizAnswers } = req.body;

    // Get user
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Validate stage
    if (!user.stage1Completed) {
      return res.status(400).json({
        success: false,
        message: "Please complete Stage 1 first"
      });
    }

    if (user.stage2Completed) {
      return res.status(400).json({
        success: false,
        message: "Stage 2 already completed"
      });
    }

    let finalCareer, finalCareerLabel;

    // Handle custom career input
    if (customCareer && customCareer.trim()) {
      finalCareer = customCareer.trim().toLowerCase().replace(/\s+/g, '-');
      finalCareerLabel = customCareer.trim();
    } else if (selectedCareer) {
      const careerOptions = await CareerOptions.getOptionsByInterest(user.detectedInterest);
      const selectedOption = careerOptions?.options.find(opt => opt.value === selectedCareer);

      if (selectedOption) {
        finalCareer = selectedOption.value;
        finalCareerLabel = selectedOption.label;
        await careerOptions.recordSelection(selectedCareer);
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid career selection"
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please select or enter a career"
      });
    }

    // Store quiz answers if provided
    if (quizAnswers && Array.isArray(quizAnswers) && quizAnswers.length > 0) {
      const formattedAnswers = quizAnswers.map(ans => ({
        stage: 2,
        quizId: ans.quizId,
        questionId: ans.questionId,
        question: ans.question,
        answer: ans.answer,
        answeredAt: new Date()
      }));

      user.quizAnswers.push(...formattedAnswers);
    }

    // Update user
    user.chosenCareer = finalCareer;
    user.chosenCareerLabel = finalCareerLabel;
    user.stage2Completed = true;
    user.currentStage = 3;
    user.lastQuizActivity = new Date();

    await user.save();

    console.log(`User ${userId} saved, generating roadmap for ${finalCareerLabel}`);

    // Try to generate roadmap synchronously (with timeout option)
    try {
      // await Promise.race([
      //   generateRoadmapForUser(userId, finalCareer, finalCareerLabel, user.quizAnswers),
      //   new Promise((_, reject) => 
      //     setTimeout(() => reject(new Error('Roadmap generation timeout')), 30000) // 30 second timeout
      //   )
      // ]);

      await generateRoadmapForUser(userId, finalCareer, finalCareerLabel, user.quizAnswers)

      console.log('Roadmap generated successfully during request');

      return res.json({
        success: true,
        message: "Career selected and roadmap generated successfully",
        data: {
          chosenCareer: finalCareer,
          chosenCareerLabel: finalCareerLabel,
          currentStage: 3,
          roadmapGenerated: true
        }
      });

    } catch (roadmapError) {
      console.error('Roadmap generation failed or timed out:', roadmapError.message);

      // Generate in background if it fails during request
      generateRoadmapForUser(userId, finalCareer, finalCareerLabel, user.quizAnswers)
        .catch(err => console.error('Background roadmap generation failed:', err));

      return res.json({
        success: true,
        message: "Career selected successfully, roadmap is being generated",
        data: {
          chosenCareer: finalCareer,
          chosenCareerLabel: finalCareerLabel,
          currentStage: 3,
          roadmapGenerating: true
        }
      });
    }

  } catch (error) {
    console.error("Error in submitStage2Selection:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit selection",
      error: error.message
    });
  }
};



/**
 * GET /api/quiz/stage3/roadmap
 * Get user's roadmap
 */
export const getRoadmap = async (req, res) => {
  try {
    const { userId } = req.auth;

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.stage2Completed) {
      return res.status(400).json({
        success: false,
        message: "Please complete Stage 2 first"
      });
    }

    // Get roadmap
    const roadmap = await Roadmap.getUserActiveRoadmap(userId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found. It might still be generating.",
        roadmapGenerating: true
      });
    }

    // Get user's progress
    const completedItemIds = user.roadmap
      .filter(item => item.completed)
      .map(item => item.roadmapItemId.toString());

    // Get unlocked items
    const unlockedItems = roadmap.getUnlockedItems(completedItemIds);
    const nextItem = roadmap.getNextItem(completedItemIds);

    res.json({
      success: true,
      data: {
        roadmap: {
          _id: roadmap._id,
          career: roadmap.career,
          careerLabel: roadmap.careerLabel,
          title: roadmap.title,
          description: roadmap.description,
          totalItems: roadmap.totalItems,
          completedItems: completedItemIds.length,
          progressPercentage: Math.round((completedItemIds.length / roadmap.totalItems) * 100),
          phases: roadmap.phases,
          items: roadmap.items.map(item => ({
            ...item.toObject(),
            userProgress: user.roadmap.find(
              ur => ur.roadmapItemId?.toString() === item.itemId
            ) || null,
            isUnlocked: unlockedItems.some(u => u.itemId === item.itemId)
          }))
        },
        nextItem,
        stats: user.stats
      }
    });

  } catch (error) {
    console.error("Error in getRoadmap:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * GET /api/quiz/stage3/quiz/:topic?
 * Get Stage 3 quiz for a topic
 */
export const getStage3Quiz = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { topic } = req.params;

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.stage2Completed || !user.chosenCareer) {
      return res.status(400).json({
        success: false,
        message: "Please complete Stage 2 first"
      });
    }

    let quiz;

    if (topic) {
      // Get quiz for specific topic
      quiz = await Quiz.getStage3Quiz(user.chosenCareer, topic, userId);
    } else {
      // Get random quiz
      quiz = await Quiz.getRandomStage3Quiz(user.chosenCareer, userId);
    }

    // If no quiz found, generate one with AI
    if (!quiz) {
      // Generate quiz on-the-fly
      quiz = await generateStage3QuizWithAI(
        user.chosenCareer,
        topic || "General Concepts",
        userId
      );
    }

    // Sanitize quiz (remove correct answers)
    const sanitizedQuiz = {
      _id: quiz._id,
      stage: quiz.stage,
      category: quiz.category,
      topic: quiz.topic,
      title: quiz.title,
      description: quiz.description,
      estimatedTime: quiz.estimatedTime,
      questions: quiz.questions.map(q => ({
        questionId: q.questionId,
        question: q.question,
        options: q.options,
        type: q.type,
        allowText: q.allowText,
        difficulty: q.difficulty,
        points: q.points
      }))
    };

    res.json({
      success: true,
      quiz: sanitizedQuiz
    });

  } catch (error) {
    console.error("Error in getStage3Quiz:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

/**
 * POST /api/quiz/stage3/submit
 * Submit Stage 3 quiz answers
 */
export const submitStage3Quiz = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { quizId, answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers are required"
      });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get quiz with correct answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz || quiz.stage !== 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz"
      });
    }

    // Check answers and calculate score
    let correctCount = 0;
    const results = answers.map(ans => {
      const question = quiz.questions.find(q => q.questionId === ans.questionId);
      if (!question) return null;

      const isCorrect = question.correctAnswer &&
        ans.answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();

      if (isCorrect) correctCount++;

      return {
        stage: 3,
        quizId: quiz._id,
        questionId: ans.questionId,
        question: question.question,
        answer: ans.answer,
        isCorrect,
        answeredAt: new Date()
      };
    }).filter(Boolean);

    // Store answers
    user.quizAnswers.push(...results);

    // Update stats
    user.stats.quizzesTaken += 1;
    user.stats.correctAnswers += correctCount;
    user.stats.totalAnswers += answers.length;
    user.lastQuizActivity = new Date();

    // Award XP
    const earnedXP = correctCount * 10;
    user.xp += earnedXP;

    // Level up check (simple: 100 XP per level)
    const newLevel = Math.floor(user.xp / 100) + 1;
    const leveledUp = newLevel > user.level;
    if (leveledUp) {
      user.level = newLevel;
    }

    await user.save();

    // Update quiz stats
    quiz.timesAttempted += 1;
    const newAverage = ((quiz.averageScore * (quiz.timesAttempted - 1)) +
      ((correctCount / answers.length) * 100)) / quiz.timesAttempted;
    quiz.averageScore = newAverage;
    await quiz.save();

    res.json({
      success: true,
      message: "Quiz submitted successfully",
      data: {
        score: correctCount,
        total: answers.length,
        percentage: Math.round((correctCount / answers.length) * 100),
        earnedXP,
        level: user.level,
        leveledUp,
        accuracy: user.calculateAccuracy(),
        results: results.map(r => ({
          questionId: r.questionId,
          question: r.question,
          yourAnswer: r.answer,
          isCorrect: r.isCorrect,
          correctAnswer: quiz.questions.find(q => q.questionId === r.questionId)?.correctAnswer,
          explanation: quiz.questions.find(q => q.questionId === r.questionId)?.explanation
        }))
      }
    });

  } catch (error) {
    console.error("Error in submitStage3Quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit quiz",
      error: error.message
    });
  }
};

/**
 * POST /api/quiz/stage3/roadmap/update
 * Update roadmap item progress
 */
export const updateRoadmapProgress = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { itemId, progress, completed } = req.body;

    // Validate input
    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "itemId is required"
      });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get user's roadmap to validate itemId exists
    const roadmap = await Roadmap.getUserActiveRoadmap(userId);
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found"
      });
    }

    // Validate itemId exists in the roadmap
    const roadmapItem = roadmap.items.find(item => item.itemId === itemId);
    if (!roadmapItem) {
      return res.status(400).json({
        success: false,
        message: "Invalid itemId: Item not found in your roadmap"
      });
    }

    // Find or create roadmap item in user's progress
    let userRoadmapItem = user.roadmap.find(
      item => item.roadmapItemId?.toString() === itemId
    );

    if (!userRoadmapItem) {
      // Add new item (now validated)
      user.roadmap.push({
        roadmapItemId: itemId,
        progress: progress || 0,
        completed: completed || false,
        startedAt: new Date()
      });
    } else {
      // Update existing
      if (progress !== undefined) userRoadmapItem.progress = progress;
      if (completed !== undefined) {
        userRoadmapItem.completed = completed;
        if (completed && !userRoadmapItem.completedAt) {
          userRoadmapItem.completedAt = new Date();
          user.stats.skillsMastered += 1;
        }
      }
    }

    await user.save();

    res.json({
      success: true,
      message: "Progress updated successfully"
    });

  } catch (error) {
    console.error("Error in updateRoadmapProgress:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update progress",
      error: error.message
    });
  }
};

// ==================== RESET ====================

/**
 * POST /api/quiz/reset
 * Reset user's entire journey
 */
// export const resetJourney = async (req, res) => {
//   try {
//     const { userId } = req.auth;

//     const user = await User.findOne({ clerkId: userId });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     await user.resetJourney();

//     res.json({
//       success: true,
//       message: "Journey reset successfully",
//       data: {
//         currentStage: 1,
//         journeyResets: user.journeyResets
//       }
//     });

//   } catch (error) {
//     console.error("Error in resetJourney:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to reset journey",
//       error: error.message
//     });
//   }
// };

// ==================== HELPER FUNCTIONS ====================



// POST /api/quiz/reset?type=soft (default)
// POST /api/quiz/reset?type=hard
export const resetJourney = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { type } = req.query; // 'soft' or 'hard'

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (type === 'hard') {
      await user.resetEverything();
    } else {
      await user.resetJourney();
    }

    res.json({
      success: true,
      message: `Journey ${type === 'hard' ? 'completely' : ''} reset successfully`,
      data: {
        currentStage: user.currentStage,
        journeyResets: user.journeyResets,
        xp: user.xp,
        level: user.level
      }
    });

  } catch (error) {
    console.error("Error in resetJourney:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset journey",
      error: error.message
    });
  }
};


// Helpers maybe have to move to service folder 

async function generateRoadmapForUser(userId, career, careerLabel, quizAnswers) {
  try {
    console.log(`Generating roadmap for user ${userId}, career: ${career}`);

    // Create prompt for AI
    const prompt = `Create a comprehensive learning roadmap for someone who wants to become a ${careerLabel}.

User's background (from quiz answers):
${quizAnswers.slice(-15).map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n')}

Generate a detailed roadmap with 20-30 items covering:
1. Foundation (beginner level)
2. Intermediate skills
3. Advanced concepts
4. Expert/Specialized topics

For each item, provide:
- title (concise, clear)
- description (1-2 sentences)
- phase (Foundation/Intermediate/Advanced/Expert)
- estimatedHours (numeric)
- skills (array of strings)
- difficulty (beginner/intermediate/advanced/expert)
- prerequisites (array of item titles that must be completed first)
- relatedTopics (array of specific topics for quizzes)

IMPORTANT: Return ONLY valid JSON with no markdown, no backticks, no explanation. Just the raw JSON object.

Format:
{
  "title": "Complete ${careerLabel} Roadmap",
  "description": "...",
  "items": [
    {
      "title": "...",
      "description": "...",
      "phase": "Foundation",
      "estimatedHours": 20,
      "skills": ["..."],
      "difficulty": "beginner",
      "prerequisites": [],
      "relatedTopics": ["..."]
    }
  ]
}`;

    console.log('Calling Gemini API...');
    const aiResponse = await geminiAPI.generateRoadmap(prompt);
    console.log('AI Response received:', aiResponse?.substring(0, 200)); // Log first 200 chars

    if (!aiResponse) {
      throw new Error('Empty response from AI');
    }

    // Clean the response (remove markdown code blocks if present)
    let cleanedResponse = aiResponse.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    console.log('Parsing JSON...');
    const roadmapData = JSON.parse(cleanedResponse);

    if (!roadmapData.items || !Array.isArray(roadmapData.items)) {
      throw new Error('Invalid roadmap data structure');
    }

    console.log(`Parsed ${roadmapData.items.length} roadmap items`);

    // Add order and itemId to each item
    const processedItems = roadmapData.items.map((item, index) => ({
      ...item,
      itemId: new ObjectId().toString(),
      order: index + 1,
      estimatedTime: `${Math.ceil(item.estimatedHours / 8)} days`
    }));

    // Create phases
    const phases = [
      {
        name: "Foundation",
        order: 1,
        description: "Essential basics to get started",
        itemIds: processedItems.filter(i => i.phase === "Foundation").map(i => i.itemId)
      },
      {
        name: "Intermediate",
        order: 2,
        description: "Building practical skills",
        itemIds: processedItems.filter(i => i.phase === "Intermediate").map(i => i.itemId)
      },
      {
        name: "Advanced",
        order: 3,
        description: "Deep dive into complex topics",
        itemIds: processedItems.filter(i => i.phase === "Advanced").map(i => i.itemId)
      },
      {
        name: "Expert",
        order: 4,
        description: "Specialized and cutting-edge skills",
        itemIds: processedItems.filter(i => i.phase === "Expert").map(i => i.itemId)
      }
    ].filter(phase => phase.itemIds.length > 0);

    console.log(`Created ${phases.length} phases`);

    // Create roadmap
    console.log('Creating roadmap in database...');
    const roadmap = await Roadmap.create({
      userId,
      career,
      careerLabel,
      title: roadmapData.title,
      description: roadmapData.description,
      items: processedItems,
      phases,
      generatedByAI: true,
      isPersonalized: true,
      aiPromptUsed: prompt
    });

    console.log(`Roadmap created with ID: ${roadmap._id}`);

    // init
    const userRoadmapItems = processedItems.map(item => ({
      itemId: item.itemId,
      status: 'not-started',
      progress: 0,
      startedAt: null,
      completedAt: null,
      notes: '',
      resourcesCompleted: []
    }));


    // Update user
    // await User.findOneAndUpdate(
    //   { clerkId: userId },
    //   {
    //     roadmapGenerated: true,
    //     roadmapId: roadmap._id // Store reference to roadmap
    //   }
    // );

    await User.findOneAndUpdate(
      { clerkId: userId },
      {
        roadmapGenerated: true,
        roadmapId: roadmap._id,
        $push: { roadmap: { $each: userRoadmapItems } } // Add all items to user's roadmap
      }
    );

    console.log(`Roadmap generated successfully for user ${userId}`);
    return roadmap; // Return the roadmap

  } catch (error) {
    console.error("Error generating roadmap:", error);
    console.error("Error stack:", error.stack);

    // Store error in database so user knows what happened
    try {
      await User.findOneAndUpdate(
        { clerkId: userId },
        {
          roadmapGenerationError: error.message,
          roadmapGenerationFailedAt: new Date()
        }
      );
    } catch (updateError) {
      console.error("Failed to update user with error:", updateError);
    }

    throw error; // Re-throw so caller knows it failed
  }
}


/**
 * Generate Stage 3 quiz with AI
 */
async function generateStage3QuizWithAI(career, topic, userId) {
  try {
    const prompt = `Generate EXACTLY 10 quiz questions about "${topic}" for someone learning ${career}.

Requirements:
- Mix of difficulty levels (mostly beginner/intermediate)
- Multiple choice questions with 4 options each
- Include correct answer and brief explanation
- Questions should test understanding, not just memorization

Return ONLY valid JSON in this format:
{
  "title": "Quiz: ${topic}",
  "description": "Test your knowledge of ${topic}",
  "questions": [
    {
      "question": "...",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "option1",
      "explanation": "...",
      "difficulty": "beginner",
      "type": "mcq"
    }
  ]
}`;

    const aiResponse = await geminiAPI.generateQuiz(prompt);
    const quizData = JSON.parse(aiResponse);

    // Create quiz
    const quiz = await Quiz.create({
      stage: 3,
      category: career,
      topic,
      scope: "user-specific",
      userId,
      title: quizData.title,
      description: quizData.description,
      questions: quizData.questions.map(q => ({
        ...q,
        questionId: new mongoose.Types.ObjectId().toString(),
        allowText: false,
        points: 10
      })),
      isAiGenerated: true,
      aiPromptUsed: prompt
    });

    return quiz;

  } catch (error) {
    console.error("Error generating Stage 3 quiz:", error);
    throw error;
  }
}

export default {
  getStage1Quiz,
  submitStage1Quiz,
  getStage2Data,
  submitStage2Selection,
  getRoadmap,
  getStage3Quiz,
  submitStage3Quiz,
  updateRoadmapProgress,
  resetJourney,

};