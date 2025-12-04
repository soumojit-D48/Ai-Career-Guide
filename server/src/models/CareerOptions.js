

import mongoose from "mongoose";

// ---------- Sub-Schema: Career Option ----------
const careerOptionSchema = new mongoose.Schema({
  value: { 
    type: String, 
    required: true 
  }, // "web-dev", "mobile-dev", "ai-ml"
  
  label: { 
    type: String, 
    required: true 
  }, // "Web Development", "Mobile Development"
  
  description: String, // Short description of this career path
  
  icon: String, // Emoji or icon identifier
  
  // Keywords that help AI match this career to user interests
  keywords: [String], // ["websites", "frontend", "backend", "html"]
  
  // Difficulty level
  difficulty: {
    type: String,
    enum: ["beginner-friendly", "intermediate", "advanced"],
    default: "beginner-friendly"
  },
  
  // Average time to proficiency
  timeToLearn: String, // "6-12 months", "1-2 years"
  
  // Job market info
  marketDemand: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium"
  },
  
  averageSalary: String, // "₹6-15 LPA" or "$80k-120k"
  
  // Related careers
  relatedCareers: [String], // ["mobile-dev", "full-stack-dev"]
  
  // Prerequisites
  prerequisites: [String], // ["basic programming", "problem solving"]
  
  order: Number // Display order
});

// ---------- Main CareerOptions Schema ----------
const careerOptionsSchema = new mongoose.Schema({
  // ---------- Detected Interest Category ----------
  // This is the category detected from Stage 1 quiz
  detectedInterest: { 
    type: String, 
    required: true,
    unique: true,
    index: true
  }, // "tech", "creative", "business", "health", "education"
  
  interestLabel: String, // "Technology", "Creative Arts"
  interestDescription: String,
  
  // ---------- Career Options ----------
  options: {
    type: [careerOptionSchema],
    required: true,
    validate: {
      validator: function(options) {
        return options.length >= 3 && options.length <= 10;
      },
      message: 'Must have between 3 and 10 career options'
    }
  },
  
  // ---------- AI Generation ----------
  isAiGenerated: { type: Boolean, default: false },
  
  // ---------- Stage 2 Question ----------
  // Optional: A guiding question for Stage 2
  stage2Question: String, // "Which area of technology interests you most?"
  
  // ---------- Usage Stats ----------
  timesShown: { type: Number, default: 0 },
  selectionStats: {
    type: Map,
    of: Number,
    default: new Map()
  }, // { "web-dev": 150, "ai-ml": 89, ... }
  
  // ---------- Status ----------
  isActive: { type: Boolean, default: true },
  
  // ---------- Timestamps ----------
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ---------- Indexes ----------
careerOptionsSchema.index({ detectedInterest: 1, isActive: 1 });

// ---------- Middleware ----------
careerOptionsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// ---------- Instance Methods ----------
careerOptionsSchema.methods.recordSelection = function(careerValue) {
  const currentCount = this.selectionStats.get(careerValue) || 0;
  this.selectionStats.set(careerValue, currentCount + 1);
  return this.save();
};

careerOptionsSchema.methods.getPopularCareers = function(limit = 5) {
  return Array.from(this.selectionStats.entries())
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, limit)
    .map(([career, count]) => ({
      career,
      count,
      option: this.options.find(opt => opt.value === career)
    }));
};

// ---------- Static Methods ----------
careerOptionsSchema.statics.getOptionsByInterest = function(detectedInterest) {
  return this.findOne({ 
    detectedInterest, 
    isActive: true 
  });
};

careerOptionsSchema.statics.getAllInterests = function() {
  return this.find({ isActive: true })
    .select('detectedInterest interestLabel interestDescription')
    .sort({ detectedInterest: 1 });
};

careerOptionsSchema.statics.findCareerOption = function(detectedInterest, careerValue) {
  return this.findOne({ 
    detectedInterest, 
    'options.value': careerValue,
    isActive: true 
  }).then(doc => {
    if (!doc) return null;
    return doc.options.find(opt => opt.value === careerValue);
  });
};

export default mongoose.model("CareerOptions", careerOptionsSchema);