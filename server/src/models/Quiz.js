

// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//   question: String,
//   options: [String],                 // MCQ options
//   allowText: { type: Boolean, default: true },  // user can write their own answer
//   type: { type: String, enum: ["mcq", "text"], default: "mcq" }
// });

// const quizSchema = new mongoose.Schema({
//   stage: { type: Number, required: true }, // 1,2,3
//   category: String,                        // common, tech, web-dev, ai-ml
//   generatedFor: String,                    // "all" or userId
//   isAiGenerated: { type: Boolean, default: false },

//   questions: [questionSchema],

//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Quiz", quizSchema);


import mongoose from "mongoose";

// ---------- Sub-Schema: Question ----------
const questionSchema = new mongoose.Schema({
  questionId: { 
    type: String, 
    required: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  question: { type: String, required: true },
  
  // For MCQ questions
  options: [String],
  
  // Correct answer (for Stage 3 quizzes with evaluation)
  correctAnswer: String, // The correct option or expected answer pattern
  
  // Allow user to write custom text instead of selecting option
  allowText: { type: Boolean, default: true },
  
  // Question type
  type: { 
    type: String, 
    enum: ["mcq", "text", "both"], // "both" means MCQ with custom text option
    default: "both" 
  },
  
  // Explanation for the answer (shown after answering)
  explanation: String,
  
  // Difficulty level (for Stage 3)
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
  },
  
  // Points awarded for correct answer
  points: { type: Number, default: 10 }
});

// ---------- Main Quiz Schema ----------
const quizSchema = new mongoose.Schema({
  // ---------- Stage Information ----------
  stage: { 
    type: Number, 
    required: true, 
    enum: [1, 2, 3],
    index: true
  },
  
  // ---------- Category/Career Path ----------
  // Stage 1: "general" (same for everyone)
  // Stage 2: "tech", "creative", "business" (based on detected interest)
  // Stage 3: "web-dev", "ai-ml", "graphic-design" (specific career)
  category: { 
    type: String, 
    required: true,
    index: true
  },
  
  // ---------- Topic (Stage 3 only) ----------
  // Specific topic within the career path
  // Examples: "JavaScript Basics", "React Hooks", "CSS Flexbox"
  topic: String,
  
  // Subtopic for more granular organization
  subtopic: String,
  
  // ---------- Scope ----------
  // "global" - can be used by anyone (Stage 1, 2, and pre-generated Stage 3)
  // "user-specific" - generated specifically for a user (Stage 3 AI-generated)
  scope: { 
    type: String, 
    enum: ["global", "user-specific"], 
    default: "global",
    index: true
  },
  
  // Only populated if scope is "user-specific"
  userId: { 
    type: String,
    index: true
  },
  
  // ---------- Questions ----------
  questions: {
    type: [questionSchema],
    validate: {
      validator: function(questions) {
        // Stage 1 and 2: exactly 10 questions
        if (this.stage === 1 || this.stage === 2) {
          return questions.length === 10;
        }
        // Stage 3: 1-10 questions
        return questions.length >= 1 && questions.length <= 10;
      },
      message: 'Invalid number of questions for this stage'
    }
  },
  
  // ---------- AI Generation ----------
  isAiGenerated: { type: Boolean, default: false },
  aiPromptUsed: String, // Store the prompt used to generate (for debugging)
  
  // ---------- Quiz Metadata ----------
  title: String, // "Initial Interest Assessment", "Web Dev Basics - Variables"
  description: String,
  
  // Estimated time to complete (in minutes)
  estimatedTime: { type: Number, default: 10 },
  
  // ---------- Usage Stats ----------
  timesAttempted: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  
  // ---------- Status ----------
  isActive: { type: Boolean, default: true }, // Can be deactivated
  
  // ---------- Timestamps ----------
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ---------- Indexes for Performance ----------
quizSchema.index({ stage: 1, category: 1 });
quizSchema.index({ stage: 1, category: 1, topic: 1 });
quizSchema.index({ userId: 1, scope: 1 });
quizSchema.index({ isActive: 1 });

// ---------- Middleware ----------
quizSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// ---------- Static Methods ----------
// Get Stage 1 quiz (same for everyone)
quizSchema.statics.getStage1Quiz = function() {
  return this.findOne({ 
    stage: 1, 
    category: "general",
    isActive: true 
  });
};

// Get Stage 2 options quiz based on detected interest
quizSchema.statics.getStage2Quiz = function(detectedInterest) {
  return this.findOne({ 
    stage: 2, 
    category: detectedInterest,
    scope: "global",
    isActive: true 
  });
};

// Get Stage 3 quiz for a specific topic
quizSchema.statics.getStage3Quiz = function(career, topic, userId = null) {
  const query = {
    stage: 3,
    category: career,
    isActive: true
  };
  
  if (topic) query.topic = topic;
  
  // Prefer user-specific quiz, fallback to global
  if (userId) {
    return this.findOne({ ...query, userId, scope: "user-specific" })
      .then(quiz => {
        if (quiz) return quiz;
        return this.findOne({ ...query, scope: "global" });
      });
  }
  
  return this.findOne({ ...query, scope: "global" });
};

// Get random Stage 3 quiz for a career
quizSchema.statics.getRandomStage3Quiz = function(career, userId = null) {
  const query = {
    stage: 3,
    category: career,
    isActive: true
  };
  
  if (userId) {
    return this.aggregate([
      { $match: { ...query, $or: [{ userId }, { scope: "global" }] } },
      { $sample: { size: 1 } }
    ]).then(results => results[0]);
  }
  
  return this.aggregate([
    { $match: { ...query, scope: "global" } },
    { $sample: { size: 1 } }
  ]).then(results => results[0]);
};

export default mongoose.model("Quiz", quizSchema);
