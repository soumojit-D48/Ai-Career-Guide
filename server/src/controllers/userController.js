
/**
 * GET /api/user/profile
 * Get comprehensive user profile with stats
 */

import Roadmap from "../models/Roadmap.js";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.auth

        const user = await User.findOne({ clerkId: userId })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const roadmap = await Roadmap.getUserActiveRoadmap(userId)

        const completedItems = user.roadmap.filter(item => item.completed).length
        const totalItems = user.roadmap.length
        const roadmapProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

        // quiz history stage 3

        const stage3Quizzes = user.quizAnswers.filter(qa => qa.stage === 3)
        const uniqueQuizIds = [...new Set(stage3Quizzes.map(qa => qa.quizId.toString()))]
        // Gets unique quiz IDs (removes duplicates if user took same quiz twice)
        const quizHistory = await Promise.all(
            uniqueQuizIds.map(async (quizId) => {
                const quiz = await Quiz.findById(quizId);
                const userAnswers = stage3Quizzes.filter(qa => qa.quizId.toString() === quizId);
                const correctCount = userAnswers.filter(a => a.isCorrect).length;
                const totalQuestions = userAnswers.length;

                return {
                    quizId,
                    title: quiz?.title || "Quiz",
                    topic: quiz?.topic || "General",
                    score: correctCount,
                    total: totalQuestions,
                    percentage: Math.round((correctCount / totalQuestions) * 100),
                    date: userAnswers[0]?.answeredAt
                };
            })
        );

        // Calculate stats
        const accuracy = user.calculateAccuracy();
        const quizzesTaken = user.stats.quizzesTaken;

        res.json({
            success: true,
            profile: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    level: user.level,
                    xp: user.xp,
                    nextLevelXP: (user.level + 1) * 100
                },
                journey: {
                    currentStage: user.currentStage,
                    detectedInterest: user.detectedInterest,
                    chosenCareer: user.chosenCareer,
                    chosenCareerLabel: user.chosenCareerLabel,
                    journeyResets: user.journeyResets
                },
                stats: {
                    careerProgress: roadmapProgress,
                    skillsMastered: completedItems,
                    quizzesTaken,
                    accuracy,
                    correctAnswers: user.stats.correctAnswers,
                    totalAnswers: user.stats.totalAnswers,
                    learningHours: user.stats.learningHours
                },
                roadmap: roadmap ? {
                    id: roadmap._id,
                    title: roadmap.title,
                    totalItems,
                    completedItems,
                    progressPercentage: roadmapProgress
                } : null,
                quizHistory: quizHistory.sort((a, b) => new Date(b.date) - new Date(a.date)),
                badges: user.badges,
                recentActivity: {
                    lastQuizActivity: user.lastQuizActivity,
                    lastLoginAt: user.lastLoginAt
                }
            }
        });

    } catch (error) {
        console.error("Error in getUserProfile:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
            error: error.message
        });
    }
};

export default getUserProfile