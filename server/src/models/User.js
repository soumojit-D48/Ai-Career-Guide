// import mongoose from "mongoose";

// // ---------- Stats ----------
// const userStatsSchema = new mongoose.Schema({
//   careerProgress: { type: Number, default: 0 },
//   skillsMastered: { type: Number, default: 0 },
//   goalsAchieved: { type: Number, default: 0 },
//   totalGoals: { type: Number, default: 0 },
//   learningHours: { type: Number, default: 0 }
// });

// // ---------- Roadmap / Learning Path ----------
// const roadmapItemSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   order: Number,
//   completed: { type: Boolean, default: false },
//   progress: { type: Number, default: 0 }, // 0–100%
//   unlocked: { type: Boolean, default: true }
// });

// // ---------- Badges ----------
// const badgeSchema = new mongoose.Schema({
//   title: String,
//   icon: String,
//   earnedAt: { type: Date, default: Date.now }
// });

// // ---------- User Schema ----------
// const userSchema = new mongoose.Schema({
//   clerkId: { type: String, unique: true, required: true },
//   name: String,
//   email: String,
//   avatar: String,

//   // Quiz progress tracking
//   currentStage: { type: Number, default: 1 },  // Stage 1, 2, 3
//   detectedInterest: String,                    // Tech, Non-Tech, etc
//   chosenCareer: String,                        // Web Dev, AI/ML etc

//   quizAnswers: [
//     {
//       stage: Number,
//       quizId: mongoose.Schema.Types.ObjectId,
//       questionId: String,
//       answer: mongoose.Schema.Types.Mixed   // text or mcq
//     }
//   ],

//   // Roadmap (user-specific)
//   roadmap: [roadmapItemSchema],

//   // User dashboard stats
//   stats: userStatsSchema,

//   // Badges
//   badges: [badgeSchema],

//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("User", userSchema);











import mongoose from "mongoose";

// ---------- Sub-Schema: User Stats ----------
const userStatsSchema = new mongoose.Schema({
  careerProgress: { type: Number, default: 0 }, // Overall progress %
  skillsMastered: { type: Number, default: 0 }, // Count of completed roadmap items
  goalsAchieved: { type: Number, default: 0 }, // Completed personal goals
  totalGoals: { type: Number, default: 0 }, // Total goals set
  learningHours: { type: Number, default: 0 }, // Estimated learning hours
  quizzesTaken: { type: Number, default: 0 }, // Total Stage 3 quizzes completed
  correctAnswers: { type: Number, default: 0 }, // For accuracy tracking
  totalAnswers: { type: Number, default: 0 }
});

// ---------- Sub-Schema: Roadmap Item (User-specific progress) ----------
const roadmapItemSchema = new mongoose.Schema({
  roadmapItemId: mongoose.Schema.Types.ObjectId, // Reference to master roadmap item
  title: String,
  description: String,
  order: Number,
  completed: { type: Boolean, default: false },
  progress: { type: Number, default: 0 }, // 0-100%
  unlocked: { type: Boolean, default: true },
  startedAt: Date,
  completedAt: Date
});

// ---------- Sub-Schema: Badges ----------
const badgeSchema = new mongoose.Schema({
  title: String,
  icon: String, // URL or emoji
  description: String,
  earnedAt: { type: Date, default: Date.now }
});

// ---------- Sub-Schema: Quiz Answer ----------
const quizAnswerSchema = new mongoose.Schema({
  stage: { type: Number, required: true }, // 1, 2, or 3
  quizId: mongoose.Schema.Types.ObjectId, // Reference to Quiz
  questionId: String, // Question identifier
  question: String, // Store question text for history
  answer: mongoose.Schema.Types.Mixed, // String (text) or String (selected option)
  isCorrect: Boolean, // For Stage 3 quizzes
  answeredAt: { type: Date, default: Date.now }
});

// ---------- Main User Schema ----------
const userSchema = new mongoose.Schema({
  // Clerk Authentication
  clerkId: { 
    type: String, 
    unique: true, 
    required: true,
    index: true 
  },
  name: String,
  email: { type: String, required: true },
  avatar: String,

  // ---------- Quiz Journey Tracking ----------
  currentStage: { 
    type: Number, 
    default: 1,
    enum: [1, 2, 3] // Stage 1: Initial, Stage 2: Career selection, Stage 3: Learning
  },
  
  // Stage 1 completion flag
  stage1Completed: { type: Boolean, default: false },
  
  // Stage 2: AI-detected interest from Stage 1
  detectedInterest: String, // "tech", "creative", "business", etc
  
  // Stage 2: Options presented to user by AI
  stage2PresentedOptions: [
    {
      value: String, // "web-dev", "mobile-dev", "ai-ml"
      label: String, // "Web Development", "Mobile Development"
      description: String
    }
  ],
  
  // Stage 2 completion flag
  stage2Completed: { type: Boolean, default: false },
  
  // Chosen career path
  chosenCareer: String, // "web-dev", "ai-ml", "graphic-design", etc
  chosenCareerLabel: String, // "Web Development" (display name)

  // ---------- Quiz Answers History ----------
  quizAnswers: [quizAnswerSchema],

  // ---------- Stage 3: Learning Phase ----------
  roadmapGenerated: { type: Boolean, default: false },
  roadmap: [roadmapItemSchema], // User's personal roadmap progress
  
  // Current topic being studied in Stage 3
  currentTopic: String, // "JavaScript Basics", "React Hooks", etc
  
  // Topics completed
  completedTopics: [String],

  // ---------- User Dashboard Stats ----------
  stats: {
    type: userStatsSchema,
    default: () => ({})
  },

  // ---------- Gamification ----------
  badges: [badgeSchema],
  
  // Experience points
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },

  // ---------- Activity Tracking ----------
  lastQuizActivity: Date, // Last time user took any quiz
  lastLoginAt: Date,
  
  // ---------- Reset Functionality ----------
  journeyResets: { type: Number, default: 0 }, // How many times user restarted
  lastResetAt: Date,

  // ---------- Timestamps ----------
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ---------- Indexes for Performance ----------
userSchema.index({ email: 1 });
userSchema.index({ currentStage: 1 });
userSchema.index({ chosenCareer: 1 });

// ---------- Middleware: Update timestamp ----------
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// ---------- Methods ----------


// Add two methods in User.js

// Soft reset - keeps achievements
userSchema.methods.resetJourney = function() {
  this.currentStage = 1;
  this.stage1Completed = false;
  this.stage2Completed = false;
  this.detectedInterest = undefined;
  this.stage2PresentedOptions = [];
  this.chosenCareer = undefined;
  this.chosenCareerLabel = undefined;
  this.roadmapGenerated = false;
  this.roadmap = [];
  this.currentTopic = undefined;
  this.completedTopics = [];
  this.quizAnswers = [];
  this.journeyResets += 1;
  this.lastResetAt = Date.now();
  return this.save();
};

// Hard reset - wipes everything
userSchema.methods.resetEverything = function() {
  this.currentStage = 1;
  this.stage1Completed = false;
  this.stage2Completed = false;
  this.detectedInterest = undefined;
  this.stage2PresentedOptions = [];
  this.chosenCareer = undefined;
  this.chosenCareerLabel = undefined;
  this.roadmapGenerated = false;
  this.roadmap = [];
  this.currentTopic = undefined;
  this.completedTopics = [];
  this.quizAnswers = [];
  this.xp = 0;
  this.level = 1;
  this.badges = [];
  this.stats = {
    careerProgress: 0,
    skillsMastered: 0,
    goalsAchieved: 0,
    totalGoals: 0,
    learningHours: 0,
    quizzesTaken: 0,
    correctAnswers: 0,
    totalAnswers: 0
  };
  this.journeyResets += 1;
  this.lastResetAt = Date.now();
  return this.save();
};




userSchema.methods.calculateAccuracy = function() {
  if (this.stats.totalAnswers === 0) return 0;
  return Math.round((this.stats.correctAnswers / this.stats.totalAnswers) * 100);
};

export default mongoose.model("User", userSchema);