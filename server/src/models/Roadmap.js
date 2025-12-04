

// const roadmapItemSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   order: Number
// });

// const roadmapSchema = new mongoose.Schema({
//   career: String,                // "Web Development"
//   generatedByAI: Boolean,
//   items: [roadmapItemSchema],
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Roadmap", roadmapSchema);








import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// ---------- Sub-Schema: Resource ----------
const resourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: {
    type: String,
    enum: ["article", "video", "course", "documentation", "book", "practice"],
    default: "article"
  },
  isPremium: { type: Boolean, default: false }
});

// ---------- Sub-Schema: Roadmap Item ----------
const roadmapItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    default: () => new ObjectId().toString()
  },
  
  title: { type: String, required: true },
  description: String,
  
  // Order in the roadmap
  order: { type: Number, required: true },
  
  // What phase/section this belongs to
  phase: String, // "Foundation", "Intermediate", "Advanced", "Expert"
  
  // Resources for learning this item
  resources: [resourceSchema],
  
  // Estimated time to complete
  estimatedTime: String, // "2 weeks", "1 month", "3 days"
  estimatedHours: Number, // Numeric hours for calculation
  
  // Prerequisites (itemIds that must be completed first)
  prerequisites: [String],
  
  // Skills learned
  skills: [String], // ["HTML", "CSS", "Responsive Design"]
  
  // Difficulty level
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "expert"],
    default: "beginner"
  },
  
  // Related topics for Stage 3 quizzes
  relatedTopics: [String], // Topics user can be quizzed on
  
  // Is this item optional?
  isOptional: { type: Boolean, default: false },
  
  // Is this a milestone?
  isMilestone: { type: Boolean, default: false }
});

// ---------- Main Roadmap Schema ----------
const roadmapSchema = new mongoose.Schema({
  // ---------- User Link ----------
  userId: { 
    type: String, 
    required: true,
    index: true 
  },
  
  // ---------- Career Path ----------
  career: { 
    type: String, 
    required: true,
    index: true
  }, // "web-dev", "ai-ml", "graphic-design"
  
  careerLabel: String, // "Web Development" (display name)
  
  // ---------- Roadmap Items ----------
  items: {
    type: [roadmapItemSchema],
    required: true,
    validate: {
      validator: function(items) {
        return items.length > 0;
      },
      message: 'Roadmap must have at least one item'
    }
  },
  
  // ---------- Roadmap Metadata ----------
  title: String, // "Complete Web Development Roadmap"
  description: String,
  
  // Total estimated time
  totalEstimatedHours: Number,
  totalEstimatedTime: String, // "6 months", "1 year"
  
  // ---------- AI Generation ----------
  generatedByAI: { type: Boolean, default: true },
  aiPromptUsed: String, // Store prompt for reference
  
  // Was this customized based on user's Stage 1 & 2 answers?
  isPersonalized: { type: Boolean, default: true },
  
  // User's interests/goals that influenced this roadmap
  userInterests: [String],
  userGoals: [String],
  
  // ---------- Progress Tracking ----------
  // These are calculated fields, updated by controllers
  totalItems: Number,
  completedItems: { type: Number, default: 0 },
  progressPercentage: { type: Number, default: 0 },
  
  // ---------- Phases/Sections ----------
  phases: [
    {
      name: String, // "Foundation", "Intermediate"
      order: Number,
      description: String,
      itemIds: [String] // Which items belong to this phase
    }
  ],
  
  // ---------- Status ----------
  isActive: { type: Boolean, default: true },
  
  // ---------- Versioning ----------
  // If user wants to update/regenerate roadmap
  version: { type: Number, default: 1 },
  previousVersionId: mongoose.Schema.Types.ObjectId,
  
  // ---------- Timestamps ----------
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastAccessedAt: Date
});

// ---------- Indexes ----------
roadmapSchema.index({ userId: 1, career: 1 });
roadmapSchema.index({ userId: 1, isActive: 1 });

// ---------- Middleware ----------
roadmapSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Calculate total items
  if (this.items && this.items.length > 0) {
    this.totalItems = this.items.length;
    
    // Calculate total estimated hours
    this.totalEstimatedHours = this.items.reduce((sum, item) => {
      return sum + (item.estimatedHours || 0);
    }, 0);
  }
  
  next();
});

// ---------- Instance Methods ----------
roadmapSchema.methods.updateProgress = function() {
  // Get completed items from user's roadmap progress
  // This is a placeholder - actual logic will be in controller
  // by comparing with user.roadmap array
  
  if (this.totalItems > 0) {
    this.progressPercentage = Math.round(
      (this.completedItems / this.totalItems) * 100
    );
  }
  return this.save();
};

roadmapSchema.methods.getNextItem = function(userCompletedItemIds) {
  // Find the next item that:
  // 1. Is not completed
  // 2. Has all prerequisites completed
  
  for (const item of this.items.sort((a, b) => a.order - b.order)) {
    // Check if already completed
    if (userCompletedItemIds.includes(item.itemId)) continue;
    
    // Check prerequisites
    const prerequisitesMet = item.prerequisites.every(prereqId => 
      userCompletedItemIds.includes(prereqId)
    );
    
    if (prerequisitesMet) {
      return item;
    }
  }
  
  return null; // All items completed
};

roadmapSchema.methods.getItemsByPhase = function(phaseName) {
  return this.items.filter(item => item.phase === phaseName)
    .sort((a, b) => a.order - b.order);
};

roadmapSchema.methods.getUnlockedItems = function(userCompletedItemIds) {
  return this.items.filter(item => {
    // If no prerequisites, it's unlocked
    if (!item.prerequisites || item.prerequisites.length === 0) {
      return true;
    }
    
    // Check if all prerequisites are completed
    return item.prerequisites.every(prereqId => 
      userCompletedItemIds.includes(prereqId)
    );
  }).sort((a, b) => a.order - b.order);
};

// ---------- Static Methods ----------
roadmapSchema.statics.getUserActiveRoadmap = function(userId) {
  return this.findOne({ 
    userId, 
    isActive: true 
  }).sort({ createdAt: -1 }); // Get latest
};

roadmapSchema.statics.getRoadmapByCareer = function(userId, career) {
  return this.findOne({ 
    userId, 
    career,
    isActive: true 
  });
};

export default mongoose.model("Roadmap", roadmapSchema);