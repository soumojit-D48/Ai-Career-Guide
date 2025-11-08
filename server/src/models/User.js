import mongoose from "mongoose";

// ---------- Stats ----------
const userStatsSchema = new mongoose.Schema({
  careerProgress: { type: Number, default: 0 },
  skillsMastered: { type: Number, default: 0 },
  goalsAchieved: { type: Number, default: 0 },
  totalGoals: { type: Number, default: 0 },
  learningHours: { type: Number, default: 0 }
});

// ---------- Roadmap / Learning Path ----------
const roadmapItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number,
  completed: { type: Boolean, default: false },
  progress: { type: Number, default: 0 }, // 0–100%
  unlocked: { type: Boolean, default: true }
});

// ---------- Badges ----------
const badgeSchema = new mongoose.Schema({
  title: String,
  icon: String,
  earnedAt: { type: Date, default: Date.now }
});

// ---------- User Schema ----------
const userSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true, required: true },
  name: String,
  email: String,
  avatar: String,

  // Quiz progress tracking
  currentStage: { type: Number, default: 1 },  // Stage 1, 2, 3
  detectedInterest: String,                    // Tech, Non-Tech, etc
  chosenCareer: String,                        // Web Dev, AI/ML etc

  quizAnswers: [
    {
      stage: Number,
      quizId: mongoose.Schema.Types.ObjectId,
      questionId: String,
      answer: mongoose.Schema.Types.Mixed   // text or mcq
    }
  ],

  // Roadmap (user-specific)
  roadmap: [roadmapItemSchema],

  // User dashboard stats
  stats: userStatsSchema,

  // Badges
  badges: [badgeSchema],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
