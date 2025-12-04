// import User from "../models/User.js";
// import Quiz from "../models/Quiz.js";
// import CareerOptions from "../models/CareerOptions.js";
// import { geminiAPI } from "../service/geminiService.js";

// /**
//  * Seed Controller - Initialize database with AI-generated content
//  * Run once to populate Stage 1, Stage 2 quizzes and career options
//  */

// /**
//  * POST /api/seed/stage1
//  * Generate and save Stage 1 quiz
//  */
// export const seedStage1Quiz = async (req, res) => {
//   try {
//     // Check if Stage 1 quiz already exists
//     const existingQuiz = await Quiz.findOne({ stage: 1, category: "general" });
    
//     if (existingQuiz) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Stage 1 quiz already exists",
//         quizId: existingQuiz._id
//       });
//     }

//     console.log("Generating Stage 1 quiz with Gemini AI...");
    
//     // Generate quiz with AI
//     const quizData = await geminiAPI.generateStage1Quiz();
    
//     // Add questionId to each question
//     const questions = quizData.questions.map((q, index) => ({
//       ...q,
//       questionId: `q1_${index + 1}`
//     }));

//     // Save to database
//     const quiz = await Quiz.create({
//       stage: 1,
//       category: "general",
//       scope: "global",
//       title: quizData.title,
//       description: quizData.description,
//       estimatedTime: quizData.estimatedTime,
//       questions,
//       isAiGenerated: true,
//       isActive: true
//     });

//     console.log("Stage 1 quiz created successfully");

//     res.json({ 
//       success: true,
//       message: "Stage 1 quiz generated successfully",
//       quiz: {
//         _id: quiz._id,
//         title: quiz.title,
//         questionsCount: quiz.questions.length
//       }
//     });

//   } catch (error) {
//     console.error("Error in seedStage1Quiz:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 1 quiz",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/stage2
//  * Generate and save Stage 2 quizzes and career options
//  */
// export const seedStage2Data = async (req, res) => {
//   try {
//     const interests = ["tech", "creative", "business", "health", "education"];
//     const results = {
//       careerOptions: [],
//       quizzes: []
//     };

//     for (const interest of interests) {
//       console.log(`Processing ${interest}...`);

//       // 1. Generate career options
//       const existingCareerOptions = await CareerOptions.findOne({ 
//         detectedInterest: interest 
//       });

//       if (!existingCareerOptions) {
//         console.log(`Generating career options for ${interest}...`);
        
//         const careerData = await geminiAPI.generateCareerOptions(interest);
        
//         const careerOptions = await CareerOptions.create({
//           detectedInterest: interest,
//           interestLabel: careerData.interestLabel,
//           interestDescription: careerData.interestDescription,
//           stage2Question: careerData.stage2Question,
//           options: careerData.options,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.careerOptions.push({
//           interest,
//           _id: careerOptions._id,
//           optionsCount: careerOptions.options.length
//         });

//         console.log(`Career options for ${interest} created`);
//       } else {
//         console.log(`Career options for ${interest} already exist`);
//         results.careerOptions.push({
//           interest,
//           _id: existingCareerOptions._id,
//           optionsCount: existingCareerOptions.options.length,
//           skipped: true
//         });
//       }

//       // 2. Generate Stage 2 quiz
//       const existingQuiz = await Quiz.findOne({ 
//         stage: 2, 
//         category: interest 
//       });

//       if (!existingQuiz) {
//         console.log(`Generating Stage 2 quiz for ${interest}...`);
        
//         const quizData = await geminiAPI.generateStage2Quiz(interest);
        
//         const questions = quizData.questions.map((q, index) => ({
//           ...q,
//           questionId: `q2_${interest}_${index + 1}`
//         }));

//         const quiz = await Quiz.create({
//           stage: 2,
//           category: interest,
//           scope: "global",
//           title: quizData.title,
//           description: quizData.description,
//           estimatedTime: quizData.estimatedTime,
//           questions,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.quizzes.push({
//           interest,
//           _id: quiz._id,
//           questionsCount: quiz.questions.length
//         });

//         console.log(`Stage 2 quiz for ${interest} created`);
//       } else {
//         console.log(`Stage 2 quiz for ${interest} already exists`);
//         results.quizzes.push({
//           interest,
//           _id: existingQuiz._id,
//           questionsCount: existingQuiz.questions.length,
//           skipped: true
//         });
//       }

//       // Add delay to avoid rate limiting
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }

//     res.json({ 
//       success: true,
//       message: "Stage 2 data generated successfully",
//       results
//     });

//   } catch (error) {
//     console.error("Error in seedStage2Data:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 2 data",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/stage3/:career
//  * Generate common Stage 3 quizzes for a specific career
//  */
// export const seedStage3QuizzesForCareer = async (req, res) => {
//   try {
//     const { career } = req.params;
//     const { topics } = req.body; // Array of topics to generate quizzes for

//     if (!topics || !Array.isArray(topics) || topics.length === 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Topics array is required"
//       });
//     }

//     const results = [];

//     for (const topic of topics) {
//       console.log(`Generating Stage 3 quiz for ${career} - ${topic}...`);

//       // Check if already exists
//       const existing = await Quiz.findOne({
//         stage: 3,
//         category: career,
//         topic,
//         scope: "global"
//       });

//       if (existing) {
//         console.log(`Quiz for ${topic} already exists`);
//         results.push({
//           topic,
//           _id: existing._id,
//           skipped: true
//         });
//         continue;
//       }

//       // Generate quiz
//       const prompt = `Generate 10 quiz questions about "${topic}" for someone learning ${career}.

// Requirements:
// - Mix of difficulty levels (3 beginner, 4 intermediate, 3 advanced)
// - Multiple choice questions with 4 options each
// - Include correct answer and brief explanation
// - Questions should test practical understanding

// Return ONLY valid JSON:
// {
//   "title": "Quiz: ${topic}",
//   "description": "Test your knowledge of ${topic}",
//   "questions": [
//     {
//       "question": "...",
//       "options": ["option1", "option2", "option3", "option4"],
//       "correctAnswer": "option1",
//       "explanation": "...",
//       "difficulty": "beginner",
//       "type": "mcq",
//       "points": 10
//     }
//   ]
// }`;

//       const aiResponse = await geminiAPI.generate(prompt);
//       let text = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
//       const quizData = JSON.parse(text);

//       // Add questionIds
//       const questions = quizData.questions.map((q, index) => ({
//         ...q,
//         questionId: `q3_${career}_${topic.replace(/\s+/g, '_')}_${index + 1}`,
//         allowText: false
//       }));

//       const quiz = await Quiz.create({
//         stage: 3,
//         category: career,
//         topic,
//         scope: "global",
//         title: quizData.title,
//         description: quizData.description,
//         estimatedTime: 10,
//         questions,
//         isAiGenerated: true,
//         isActive: true,
//         aiPromptUsed: prompt
//       });

//       results.push({
//         topic,
//         _id: quiz._id,
//         questionsCount: quiz.questions.length
//       });

//       console.log(`Quiz for ${topic} created`);

//       // Delay to avoid rate limiting
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }

//     res.json({ 
//       success: true,
//       message: `Stage 3 quizzes for ${career} generated successfully`,
//       results
//     });

//   } catch (error) {
//     console.error("Error in seedStage3QuizzesForCareer:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 3 quizzes",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/all
//  * Generate all initial data (Stage 1, 2)
//  * WARNING: This can take several minutes and consume API credits
//  */
// export const seedAll = async (req, res) => {
//   try {
//     const results = {
//       stage1: null,
//       stage2: null
//     };

//     // 1. Generate Stage 1
//     console.log("=== Generating Stage 1 Quiz ===");
//     const existingStage1 = await Quiz.findOne({ stage: 1, category: "general" });
    
//     if (!existingStage1) {
//       const quizData = await geminiAPI.generateStage1Quiz();
//       const questions = quizData.questions.map((q, index) => ({
//         ...q,
//         questionId: `q1_${index + 1}`
//       }));

//       const stage1Quiz = await Quiz.create({
//         stage: 1,
//         category: "general",
//         scope: "global",
//         title: quizData.title,
//         description: quizData.description,
//         estimatedTime: quizData.estimatedTime,
//         questions,
//         isAiGenerated: true,
//         isActive: true
//       });

//       results.stage1 = {
//         _id: stage1Quiz._id,
//         questionsCount: stage1Quiz.questions.length
//       };
//     } else {
//       results.stage1 = { skipped: true, _id: existingStage1._id };
//     }

//     // 2. Generate Stage 2 data
//     console.log("=== Generating Stage 2 Data ===");
//     const interests = ["tech", "creative", "business", "health", "education"];
//     results.stage2 = {
//       careerOptions: [],
//       quizzes: []
//     };

//     for (const interest of interests) {
//       console.log(`Processing ${interest}...`);

//       // Career options
//       const existingCareerOptions = await CareerOptions.findOne({ 
//         detectedInterest: interest 
//       });

//       if (!existingCareerOptions) {
//         const careerData = await geminiAPI.generateCareerOptions(interest);
//         const careerOptions = await CareerOptions.create({
//           detectedInterest: interest,
//           interestLabel: careerData.interestLabel,
//           interestDescription: careerData.interestDescription,
//           stage2Question: careerData.stage2Question,
//           options: careerData.options,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.stage2.careerOptions.push({
//           interest,
//           _id: careerOptions._id,
//           optionsCount: careerOptions.options.length
//         });
//       } else {
//         results.stage2.careerOptions.push({
//           interest,
//           _id: existingCareerOptions._id,
//           skipped: true
//         });
//       }

//       // Stage 2 quiz
//       const existingQuiz = await Quiz.findOne({ stage: 2, category: interest });

//       if (!existingQuiz) {
//         const quizData = await geminiAPI.generateStage2Quiz(interest);
//         const questions = quizData.questions.map((q, index) => ({
//           ...q,
//           questionId: `q2_${interest}_${index + 1}`
//         }));

//         const quiz = await Quiz.create({
//           stage: 2,
//           category: interest,
//           scope: "global",
//           title: quizData.title,
//           description: quizData.description,
//           estimatedTime: quizData.estimatedTime,
//           questions,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.stage2.quizzes.push({
//           interest,
//           _id: quiz._id,
//           questionsCount: quiz.questions.length
//         });
//       } else {
//         results.stage2.quizzes.push({
//           interest,
//           _id: existingQuiz._id,
//           skipped: true
//         });
//       }

//       // Delay between interests
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }

//     res.json({ 
//       success: true,
//       message: "Database seeded successfully",
//       results
//     });

//   } catch (error) {
//     console.error("Error in seedAll:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to seed database",
//       error: error.message 
//     });
//   }
// };

// /**
//  * DELETE /api/seed/reset
//  * Delete all AI-generated content (for testing)
//  */
// export const resetSeedData = async (req, res) => {
//   try {
//     const { confirm } = req.body;

//     if (confirm !== "DELETE_ALL") {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Please send { confirm: "DELETE_ALL" } to proceed'
//       });
//     }

//     // Delete all quizzes
//     const deletedQuizzes = await Quiz.deleteMany({ isAiGenerated: true });
    
//     // Delete all career options
//     const deletedCareerOptions = await CareerOptions.deleteMany({});

//     res.json({ 
//       success: true,
//       message: "All seed data deleted",
//       deleted: {
//         quizzes: deletedQuizzes.deletedCount,
//         careerOptions: deletedCareerOptions.deletedCount
//       }
//     });

//   } catch (error) {
//     console.error("Error in resetSeedData:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to reset seed data",
//       error: error.message 
//     });
//   }
// };

// export default {
//   seedStage1Quiz,
//   seedStage2Data,
//   seedStage3QuizzesForCareer,
//   seedAll,
//   resetSeedData
// };



























// import User from "../models/User.js";
// import Quiz from "../models/Quiz.js";
// import CareerOptions from "../models/CareerOptions.js";
// import { geminiAPI } from "../service/geminiService.js";

// /**
//  * Seed Controller - Initialize database with AI-generated content
//  * Run once to populate Stage 1, Stage 2 quizzes and career options
//  */

// /**
//  * POST /api/seed/stage1
//  * Generate and save Stage 1 quiz
//  */
// export const seedStage1Quiz = async (req, res) => {
//   try {
//     // Check if Stage 1 quiz already exists
//     const existingQuiz = await Quiz.findOne({ stage: 1, category: "general" });
    
//     if (existingQuiz) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Stage 1 quiz already exists",
//         quizId: existingQuiz._id
//       });
//     }

//     console.log("Generating Stage 1 quiz with Gemini AI...");
    
//     // Generate quiz with AI
//     const quizData = await geminiAPI.generateStage1Quiz();
    
//     // Add questionId to each question
//     const questions = quizData.questions.map((q, index) => ({
//       ...q,
//       questionId: `q1_${index + 1}`
//     }));

//     // Save to database
//     const quiz = await Quiz.create({
//       stage: 1,
//       category: "general",
//       scope: "global",
//       title: quizData.title,
//       description: quizData.description,
//       estimatedTime: quizData.estimatedTime,
//       questions,
//       isAiGenerated: true,
//       isActive: true
//     });

//     console.log("✓ Stage 1 quiz created successfully");

//     res.json({ 
//       success: true,
//       message: "Stage 1 quiz generated successfully",
//       quiz: {
//         _id: quiz._id,
//         title: quiz.title,
//         questionsCount: quiz.questions.length
//       }
//     });

//   } catch (error) {
//     console.error("✗ Error in seedStage1Quiz:", error.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 1 quiz",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/stage2
//  * Generate and save Stage 2 quizzes and career options
//  */
// export const seedStage2Data = async (req, res) => {
//   try {
//     const interests = ["tech", "creative", "business", "health", "education"];
//     const results = {
//       careerOptions: [],
//       quizzes: []
//     };

//     for (const interest of interests) {
//       console.log(`\n📌 Processing ${interest}...`);

//       // 1. Generate career options
//       const existingCareerOptions = await CareerOptions.findOne({ 
//         detectedInterest: interest 
//       });

//       if (!existingCareerOptions) {
//         console.log(`  → Generating career options for ${interest}...`);
        
//         const careerData = await geminiAPI.generateCareerOptions(interest);
        
//         const careerOptions = await CareerOptions.create({
//           detectedInterest: interest,
//           interestLabel: careerData.interestLabel,
//           interestDescription: careerData.interestDescription,
//           stage2Question: careerData.stage2Question,
//           options: careerData.options,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.careerOptions.push({
//           interest,
//           _id: careerOptions._id,
//           optionsCount: careerOptions.options.length
//         });

//         console.log(`  ✓ Career options created (${careerOptions.options.length} options)`);
//       } else {
//         console.log(`  ⊘ Career options already exist`);
//         results.careerOptions.push({
//           interest,
//           _id: existingCareerOptions._id,
//           optionsCount: existingCareerOptions.options.length,
//           skipped: true
//         });
//       }

//       // 2. Generate Stage 2 quiz
//       const existingQuiz = await Quiz.findOne({ 
//         stage: 2, 
//         category: interest 
//       });

//       if (!existingQuiz) {
//         console.log(`  → Generating Stage 2 quiz for ${interest}...`);
        
//         const quizData = await geminiAPI.generateStage2Quiz(interest);
        
//         const questions = quizData.questions.map((q, index) => ({
//           ...q,
//           questionId: `q2_${interest}_${index + 1}`
//         }));

//         const quiz = await Quiz.create({
//           stage: 2,
//           category: interest,
//           scope: "global",
//           title: quizData.title,
//           description: quizData.description,
//           estimatedTime: quizData.estimatedTime,
//           questions,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.quizzes.push({
//           interest,
//           _id: quiz._id,
//           questionsCount: quiz.questions.length
//         });

//         console.log(`  ✓ Stage 2 quiz created (${quiz.questions.length} questions)`);
//       } else {
//         console.log(`  ⊘ Stage 2 quiz already exists`);
//         results.quizzes.push({
//           interest,
//           _id: existingQuiz._id,
//           questionsCount: existingQuiz.questions.length,
//           skipped: true
//         });
//       }

//       // Add delay to avoid rate limiting
//       if (interest !== interests[interests.length - 1]) {
//         console.log(`  ⏳ Waiting 3 seconds...`);
//         await new Promise(resolve => setTimeout(resolve, 3000));
//       }
//     }

//     console.log("\n✓ Stage 2 data generation complete!");

//     res.json({ 
//       success: true,
//       message: "Stage 2 data generated successfully",
//       results
//     });

//   } catch (error) {
//     console.error("✗ Error in seedStage2Data:", error.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 2 data",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/stage3/:career
//  * Generate common Stage 3 quizzes for a specific career
//  */
// export const seedStage3QuizzesForCareer = async (req, res) => {
//   try {
//     const { career } = req.params;
//     const { topics } = req.body; // Array of topics to generate quizzes for

//     if (!topics || !Array.isArray(topics) || topics.length === 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Topics array is required"
//       });
//     }

//     console.log(`\n📚 Generating Stage 3 quizzes for ${career}`);
//     const results = [];

//     for (const topic of topics) {
//       console.log(`\n  → Topic: ${topic}`);

//       // Check if already exists
//       const existing = await Quiz.findOne({
//         stage: 3,
//         category: career,
//         topic,
//         scope: "global"
//       });

//       if (existing) {
//         console.log(`    ⊘ Quiz already exists`);
//         results.push({
//           topic,
//           _id: existing._id,
//           skipped: true
//         });
//         continue;
//       }

//       // Generate quiz using the generateQuiz method
//       const prompt = `Generate 10 quiz questions about "${topic}" for someone learning ${career}.

// Requirements:
// - Mix of difficulty levels (3 beginner, 4 intermediate, 3 advanced)
// - Multiple choice questions with 4 options each
// - Include correct answer and brief explanation
// - Questions should test practical understanding

// Return ONLY valid JSON:
// {
//   "title": "Quiz: ${topic}",
//   "description": "Test your knowledge of ${topic}",
//   "questions": [
//     {
//       "question": "...",
//       "options": ["option1", "option2", "option3", "option4"],
//       "correctAnswer": "option1",
//       "explanation": "...",
//       "difficulty": "beginner",
//       "type": "mcq",
//       "points": 10
//     }
//   ]
// }`;

//       try {
//         const aiResponse = await geminiAPI.generateQuiz(prompt);
//         const quizData = JSON.parse(aiResponse);

//         // Add questionIds
//         const questions = quizData.questions.map((q, index) => ({
//           ...q,
//           questionId: `q3_${career}_${topic.replace(/\s+/g, '_')}_${index + 1}`,
//           allowText: false
//         }));

//         const quiz = await Quiz.create({
//           stage: 3,
//           category: career,
//           topic,
//           scope: "global",
//           title: quizData.title,
//           description: quizData.description,
//           estimatedTime: 10,
//           questions,
//           isAiGenerated: true,
//           isActive: true,
//           aiPromptUsed: prompt
//         });

//         results.push({
//           topic,
//           _id: quiz._id,
//           questionsCount: quiz.questions.length
//         });

//         console.log(`    ✓ Quiz created (${quiz.questions.length} questions)`);

//         // Delay to avoid rate limiting
//         if (topic !== topics[topics.length - 1]) {
//           console.log(`    ⏳ Waiting 3 seconds...`);
//           await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//       } catch (topicError) {
//         console.error(`    ✗ Failed to generate quiz for ${topic}:`, topicError.message);
//         results.push({
//           topic,
//           error: topicError.message,
//           failed: true
//         });
//       }
//     }

//     console.log(`\n✓ Stage 3 generation complete for ${career}!`);

//     res.json({ 
//       success: true,
//       message: `Stage 3 quizzes for ${career} generated successfully`,
//       results
//     });

//   } catch (error) {
//     console.error("✗ Error in seedStage3QuizzesForCareer:", error.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 3 quizzes",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/all
//  * Generate all initial data (Stage 1, 2)
//  * WARNING: This can take several minutes and consume API credits
//  */
// export const seedAll = async (req, res) => {
//   try {
//     console.log("\n" + "=".repeat(50));
//     console.log("🚀 STARTING DATABASE SEED");
//     console.log("=".repeat(50));

//     const results = {
//       stage1: null,
//       stage2: null
//     };

//     // 1. Generate Stage 1
//     console.log("\n📝 STAGE 1: Initial Assessment Quiz");
//     console.log("-".repeat(50));
    
//     const existingStage1 = await Quiz.findOne({ stage: 1, category: "general" });
    
//     if (!existingStage1) {
//       console.log("→ Generating Stage 1 quiz...");
//       const quizData = await geminiAPI.generateStage1Quiz();
      
//       const questions = quizData.questions.map((q, index) => ({
//         ...q,
//         questionId: `q1_${index + 1}`
//       }));

//       const stage1Quiz = await Quiz.create({
//         stage: 1,
//         category: "general",
//         scope: "global",
//         title: quizData.title,
//         description: quizData.description,
//         estimatedTime: quizData.estimatedTime,
//         questions,
//         isAiGenerated: true,
//         isActive: true
//       });

//       results.stage1 = {
//         _id: stage1Quiz._id,
//         questionsCount: stage1Quiz.questions.length
//       };
      
//       console.log(`✓ Stage 1 quiz created (${stage1Quiz.questions.length} questions)`);
//     } else {
//       console.log("⊘ Stage 1 quiz already exists");
//       results.stage1 = { skipped: true, _id: existingStage1._id };
//     }

//     // 2. Generate Stage 2 data
//     console.log("\n📊 STAGE 2: Career Path Selection");
//     console.log("-".repeat(50));
    
//     const interests = ["tech", "creative", "business", "health", "education"];
//     results.stage2 = {
//       careerOptions: [],
//       quizzes: []
//     };

//     for (let i = 0; i < interests.length; i++) {
//       const interest = interests[i];
//       console.log(`\n[${i + 1}/${interests.length}] Processing: ${interest.toUpperCase()}`);

//       // Career options
//       const existingCareerOptions = await CareerOptions.findOne({ 
//         detectedInterest: interest 
//       });

//       if (!existingCareerOptions) {
//         console.log("  → Generating career options...");
//         const careerData = await geminiAPI.generateCareerOptions(interest);
        
//         const careerOptions = await CareerOptions.create({
//           detectedInterest: interest,
//           interestLabel: careerData.interestLabel,
//           interestDescription: careerData.interestDescription,
//           stage2Question: careerData.stage2Question,
//           options: careerData.options,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.stage2.careerOptions.push({
//           interest,
//           _id: careerOptions._id,
//           optionsCount: careerOptions.options.length
//         });
        
//         console.log(`  ✓ Career options created (${careerOptions.options.length} options)`);
//       } else {
//         console.log("  ⊘ Career options already exist");
//         results.stage2.careerOptions.push({
//           interest,
//           _id: existingCareerOptions._id,
//           skipped: true
//         });
//       }

//       // Stage 2 quiz
//       const existingQuiz = await Quiz.findOne({ stage: 2, category: interest });

//       if (!existingQuiz) {
//         console.log("  → Generating Stage 2 quiz...");
//         const quizData = await geminiAPI.generateStage2Quiz(interest);
        
//         const questions = quizData.questions.map((q, index) => ({
//           ...q,
//           questionId: `q2_${interest}_${index + 1}`
//         }));

//         const quiz = await Quiz.create({
//           stage: 2,
//           category: interest,
//           scope: "global",
//           title: quizData.title,
//           description: quizData.description,
//           estimatedTime: quizData.estimatedTime,
//           questions,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.stage2.quizzes.push({
//           interest,
//           _id: quiz._id,
//           questionsCount: quiz.questions.length
//         });
        
//         console.log(`  ✓ Stage 2 quiz created (${quiz.questions.length} questions)`);
//       } else {
//         console.log("  ⊘ Stage 2 quiz already exists");
//         results.stage2.quizzes.push({
//           interest,
//           _id: existingQuiz._id,
//           skipped: true
//         });
//       }

//       // Delay between interests
//       if (i < interests.length - 1) {
//         console.log("  ⏳ Waiting 3 seconds before next interest...");
//         await new Promise(resolve => setTimeout(resolve, 3000));
//       }
//     }

//     console.log("\n" + "=".repeat(50));
//     console.log("✓ DATABASE SEED COMPLETE!");
//     console.log("=".repeat(50));

//     res.json({ 
//       success: true,
//       message: "Database seeded successfully",
//       results
//     });

//   } catch (error) {
//     console.error("\n" + "=".repeat(50));
//     console.error("✗ SEED FAILED:", error.message);
//     console.error("=".repeat(50));
    
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to seed database",
//       error: error.message 
//     });
//   }
// };

// /**
//  * DELETE /api/seed/reset
//  * Delete all AI-generated content (for testing)
//  */
// export const resetSeedData = async (req, res) => {
//   try {
//     const { confirm } = req.body;

//     if (confirm !== "DELETE_ALL") {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Please send { confirm: "DELETE_ALL" } to proceed'
//       });
//     }

//     console.log("\n🗑️  Deleting all seed data...");

//     // Delete all quizzes
//     const deletedQuizzes = await Quiz.deleteMany({ isAiGenerated: true });
    
//     // Delete all career options
//     const deletedCareerOptions = await CareerOptions.deleteMany({});

//     console.log(`✓ Deleted ${deletedQuizzes.deletedCount} quizzes`);
//     console.log(`✓ Deleted ${deletedCareerOptions.deletedCount} career options`);

//     res.json({ 
//       success: true,
//       message: "All seed data deleted",
//       deleted: {
//         quizzes: deletedQuizzes.deletedCount,
//         careerOptions: deletedCareerOptions.deletedCount
//       }
//     });

//   } catch (error) {
//     console.error("✗ Error in resetSeedData:", error.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to reset seed data",
//       error: error.message 
//     });
//   }
// };

// export default {
//   seedStage1Quiz,
//   seedStage2Data,
//   seedStage3QuizzesForCareer,
//   seedAll,
//   resetSeedData
// };



































import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import CareerOptions from "../models/CareerOptions.js";
// import { openaiAPI } from "../service/openaiService.js"; // Changed from geminiAPI

import { openrouterAPI as openaiAPI } from "../service/openaiService.js";

/**
 * Seed Controller - Initialize database with AI-generated content
 * Run once to populate Stage 1, Stage 2 quizzes and career options
 */

/**
 * POST /api/seed/stage1
 * Generate and save Stage 1 quiz
 */
export const seedStage1Quiz = async (req, res) => {
  try {
    // Check if Stage 1 quiz already exists
    const existingQuiz = await Quiz.findOne({ stage: 1, category: "general" });
    
    if (existingQuiz) {
      return res.status(400).json({ 
        success: false,
        message: "Stage 1 quiz already exists",
        quizId: existingQuiz._id
      });
    }

    console.log("Generating Stage 1 quiz with OpenAI...");
    
    // Generate quiz with AI
    const quizData = await openaiAPI.generateStage1Quiz();
    
    // Add questionId to each question
    const questions = quizData.questions.map((q, index) => ({
      ...q,
      questionId: `q1_${index + 1}`
    }));

    // Save to database
    const quiz = await Quiz.create({
      stage: 1,
      category: "general",
      scope: "global",
      title: quizData.title,
      description: quizData.description,
      estimatedTime: quizData.estimatedTime,
      questions,
      isAiGenerated: true,
      isActive: true
    });

    console.log("✓ Stage 1 quiz created successfully");

    res.json({ 
      success: true,
      message: "Stage 1 quiz generated successfully",
      quiz: {
        _id: quiz._id,
        title: quiz.title,
        questionsCount: quiz.questions.length
      }
    });

  } catch (error) {
    console.error("✗ Error in seedStage1Quiz:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to generate Stage 1 quiz",
      error: error.message 
    });
  }
};

/**
 * POST /api/seed/stage2
 * Generate and save Stage 2 quizzes and career options
 */
export const seedStage2Data = async (req, res) => {
  try {
    const interests = ["tech", "creative", "business", "health", "education"];
    const results = {
      careerOptions: [],
      quizzes: []
    };

    for (const interest of interests) {
      console.log(`\n📌 Processing ${interest}...`);

      // 1. Generate career options
      const existingCareerOptions = await CareerOptions.findOne({ 
        detectedInterest: interest 
      });

      if (!existingCareerOptions) {
        console.log(`  → Generating career options for ${interest}...`);
        
        const careerData = await openaiAPI.generateCareerOptions(interest);
        
        const careerOptions = await CareerOptions.create({
          detectedInterest: interest,
          interestLabel: careerData.interestLabel,
          interestDescription: careerData.interestDescription,
          stage2Question: careerData.stage2Question,
          options: careerData.options,
          isAiGenerated: true,
          isActive: true
        });

        results.careerOptions.push({
          interest,
          _id: careerOptions._id,
          optionsCount: careerOptions.options.length
        });

        console.log(`  ✓ Career options created (${careerOptions.options.length} options)`);
      } else {
        console.log(`  ⊘ Career options already exist`);
        results.careerOptions.push({
          interest,
          _id: existingCareerOptions._id,
          optionsCount: existingCareerOptions.options.length,
          skipped: true
        });
      }

      // 2. Generate Stage 2 quiz
      const existingQuiz = await Quiz.findOne({ 
        stage: 2, 
        category: interest 
      });

      if (!existingQuiz) {
        console.log(`  → Generating Stage 2 quiz for ${interest}...`);
        
        const quizData = await openaiAPI.generateStage2Quiz(interest);
        
        const questions = quizData.questions.map((q, index) => ({
          ...q,
          questionId: `q2_${interest}_${index + 1}`
        }));

        const quiz = await Quiz.create({
          stage: 2,
          category: interest,
          scope: "global",
          title: quizData.title,
          description: quizData.description,
          estimatedTime: quizData.estimatedTime,
          questions,
          isAiGenerated: true,
          isActive: true
        });

        results.quizzes.push({
          interest,
          _id: quiz._id,
          questionsCount: quiz.questions.length
        });

        console.log(`  ✓ Stage 2 quiz created (${quiz.questions.length} questions)`);
      } else {
        console.log(`  ⊘ Stage 2 quiz already exists`);
        results.quizzes.push({
          interest,
          _id: existingQuiz._id,
          questionsCount: existingQuiz.questions.length,
          skipped: true
        });
      }

      // Add delay to avoid rate limiting
      if (interest !== interests[interests.length - 1]) {
        console.log(`  ⏳ Waiting 3 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    console.log("\n✓ Stage 2 data generation complete!");

    res.json({ 
      success: true,
      message: "Stage 2 data generated successfully",
      results
    });

  } catch (error) {
    console.error("✗ Error in seedStage2Data:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to generate Stage 2 data",
      error: error.message 
    });
  }
};

/**
 * POST /api/seed/stage3/:career
 * Generate common Stage 3 quizzes for a specific career
 */
export const seedStage3QuizzesForCareer = async (req, res) => {
  try {
    const { career } = req.params;
    const { topics } = req.body; // Array of topics to generate quizzes for

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Topics array is required"
      });
    }

    console.log(`\n📚 Generating Stage 3 quizzes for ${career}`);
    const results = [];

    for (const topic of topics) {
      console.log(`\n  → Topic: ${topic}`);

      // Check if already exists
      const existing = await Quiz.findOne({
        stage: 3,
        category: career,
        topic,
        scope: "global"
      });

      if (existing) {
        console.log(`    ⊘ Quiz already exists`);
        results.push({
          topic,
          _id: existing._id,
          skipped: true
        });
        continue;
      }

      // Generate quiz using the generateQuiz method
      const prompt = `Generate 10 quiz questions about "${topic}" for someone learning ${career}.

Requirements:
- Mix of difficulty levels (3 beginner, 4 intermediate, 3 advanced)
- Multiple choice questions with 4 options each
- Include correct answer and brief explanation
- Questions should test practical understanding

Return ONLY valid JSON:
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
      "type": "mcq",
      "points": 10
    }
  ]
}`;

      try {
        const aiResponse = await openaiAPI.generateQuiz(prompt);
        const quizData = JSON.parse(aiResponse);

        // Add questionIds
        const questions = quizData.questions.map((q, index) => ({
          ...q,
          questionId: `q3_${career}_${topic.replace(/\s+/g, '_')}_${index + 1}`,
          allowText: false
        }));

        const quiz = await Quiz.create({
          stage: 3,
          category: career,
          topic,
          scope: "global",
          title: quizData.title,
          description: quizData.description,
          estimatedTime: 10,
          questions,
          isAiGenerated: true,
          isActive: true,
          aiPromptUsed: prompt
        });

        results.push({
          topic,
          _id: quiz._id,
          questionsCount: quiz.questions.length
        });

        console.log(`    ✓ Quiz created (${quiz.questions.length} questions)`);

        // Delay to avoid rate limiting
        if (topic !== topics[topics.length - 1]) {
          console.log(`    ⏳ Waiting 3 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (topicError) {
        console.error(`    ✗ Failed to generate quiz for ${topic}:`, topicError.message);
        results.push({
          topic,
          error: topicError.message,
          failed: true
        });
      }
    }

    console.log(`\n✓ Stage 3 generation complete for ${career}!`);

    res.json({ 
      success: true,
      message: `Stage 3 quizzes for ${career} generated successfully`,
      results
    });

  } catch (error) {
    console.error("✗ Error in seedStage3QuizzesForCareer:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to generate Stage 3 quizzes",
      error: error.message 
    });
  }
};

/**
 * POST /api/seed/all
 * Generate all initial data (Stage 1, 2)
 * WARNING: This can take several minutes and consume API credits
 */
export const seedAll = async (req, res) => {
  try {
    console.log("\n" + "=".repeat(50));
    console.log("🚀 STARTING DATABASE SEED");
    console.log("=".repeat(50));

    const results = {
      stage1: null,
      stage2: null
    };

    // 1. Generate Stage 1
    console.log("\n📝 STAGE 1: Initial Assessment Quiz");
    console.log("-".repeat(50));
    
    const existingStage1 = await Quiz.findOne({ stage: 1, category: "general" });
    
    if (!existingStage1) {
      console.log("→ Generating Stage 1 quiz...");
      const quizData = await openaiAPI.generateStage1Quiz();
      
      const questions = quizData.questions.map((q, index) => ({
        ...q,
        questionId: `q1_${index + 1}`
      }));

      const stage1Quiz = await Quiz.create({
        stage: 1,
        category: "general",
        scope: "global",
        title: quizData.title,
        description: quizData.description,
        estimatedTime: quizData.estimatedTime,
        questions,
        isAiGenerated: true,
        isActive: true
      });

      results.stage1 = {
        _id: stage1Quiz._id,
        questionsCount: stage1Quiz.questions.length
      };
      
      console.log(`✓ Stage 1 quiz created (${stage1Quiz.questions.length} questions)`);
    } else {
      console.log("⊘ Stage 1 quiz already exists");
      results.stage1 = { skipped: true, _id: existingStage1._id };
    }

    // 2. Generate Stage 2 data
    console.log("\n📊 STAGE 2: Career Path Selection");
    console.log("-".repeat(50));
    
    const interests = ["tech", "creative", "business", "health", "education"];
    results.stage2 = {
      careerOptions: [],
      quizzes: []
    };

    for (let i = 0; i < interests.length; i++) {
      const interest = interests[i];
      console.log(`\n[${i + 1}/${interests.length}] Processing: ${interest.toUpperCase()}`);

      // Career options
      const existingCareerOptions = await CareerOptions.findOne({ 
        detectedInterest: interest 
      });

      if (!existingCareerOptions) {
        console.log("  → Generating career options...");
        const careerData = await openaiAPI.generateCareerOptions(interest);
        
        const careerOptions = await CareerOptions.create({
          detectedInterest: interest,
          interestLabel: careerData.interestLabel,
          interestDescription: careerData.interestDescription,
          stage2Question: careerData.stage2Question,
          options: careerData.options,
          isAiGenerated: true,
          isActive: true
        });

        results.stage2.careerOptions.push({
          interest,
          _id: careerOptions._id,
          optionsCount: careerOptions.options.length
        });
        
        console.log(`  ✓ Career options created (${careerOptions.options.length} options)`);
      } else {
        console.log("  ⊘ Career options already exist");
        results.stage2.careerOptions.push({
          interest,
          _id: existingCareerOptions._id,
          skipped: true
        });
      }

      // Stage 2 quiz
      const existingQuiz = await Quiz.findOne({ stage: 2, category: interest });

      if (!existingQuiz) {
        console.log("  → Generating Stage 2 quiz...");
        const quizData = await openaiAPI.generateStage2Quiz(interest);
        
        const questions = quizData.questions.map((q, index) => ({
          ...q,
          questionId: `q2_${interest}_${index + 1}`
        }));

        const quiz = await Quiz.create({
          stage: 2,
          category: interest,
          scope: "global",
          title: quizData.title,
          description: quizData.description,
          estimatedTime: quizData.estimatedTime,
          questions,
          isAiGenerated: true,
          isActive: true
        });

        results.stage2.quizzes.push({
          interest,
          _id: quiz._id,
          questionsCount: quiz.questions.length
        });
        
        console.log(`  ✓ Stage 2 quiz created (${quiz.questions.length} questions)`);
      } else {
        console.log("  ⊘ Stage 2 quiz already exists");
        results.stage2.quizzes.push({
          interest,
          _id: existingQuiz._id,
          skipped: true
        });
      }

      // Delay between interests
      if (i < interests.length - 1) {
        console.log("  ⏳ Waiting 3 seconds before next interest...");
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("✓ DATABASE SEED COMPLETE!");
    console.log("=".repeat(50));

    res.json({ 
      success: true,
      message: "Database seeded successfully",
      results
    });

  } catch (error) {
    console.error("\n" + "=".repeat(50));
    console.error("✗ SEED FAILED:", error.message);
    console.error("=".repeat(50));
    
    res.status(500).json({ 
      success: false,
      message: "Failed to seed database",
      error: error.message 
    });
  }
};

/**
 * DELETE /api/seed/reset
 * Delete all AI-generated content (for testing)
 */
export const resetSeedData = async (req, res) => {
  try {
    const { confirm } = req.body;

    if (confirm !== "DELETE_ALL") {
      return res.status(400).json({ 
        success: false,
        message: 'Please send { confirm: "DELETE_ALL" } to proceed'
      });
    }

    console.log("\n🗑️  Deleting all seed data...");

    // Delete all quizzes
    const deletedQuizzes = await Quiz.deleteMany({ isAiGenerated: true });
    
    // Delete all career options
    const deletedCareerOptions = await CareerOptions.deleteMany({});

    console.log(`✓ Deleted ${deletedQuizzes.deletedCount} quizzes`);
    console.log(`✓ Deleted ${deletedCareerOptions.deletedCount} career options`);

    res.json({ 
      success: true,
      message: "All seed data deleted",
      deleted: {
        quizzes: deletedQuizzes.deletedCount,
        careerOptions: deletedCareerOptions.deletedCount
      }
    });

  } catch (error) {
    console.error("✗ Error in resetSeedData:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to reset seed data",
      error: error.message 
    });
  }
};

export default {
  seedStage1Quiz,
  seedStage2Data,
  seedStage3QuizzesForCareer,
  seedAll,
  resetSeedData
};















































// import User from "../models/User.js";
// import Quiz from "../models/Quiz.js";
// import CareerOptions from "../models/CareerOptions.js";
// import { deepseekAPI } from "../service/deepseekService.js";

// /**
//  * Seed Controller - Initialize database with AI-generated content
//  * Run once to populate Stage 1, Stage 2 quizzes and career options
//  */

// /**
//  * POST /api/seed/stage1
//  * Generate and save Stage 1 quiz
//  */
// export const seedStage1Quiz = async (req, res) => {
//   try {
//     // Check if Stage 1 quiz already exists
//     const existingQuiz = await Quiz.findOne({ stage: 1, category: "general" });
    
//     if (existingQuiz) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Stage 1 quiz already exists",
//         quizId: existingQuiz._id
//       });
//     }

//     console.log("Generating Stage 1 quiz with DeepSeek AI...");
    
//     // Generate quiz with AI
//     const quizData = await deepseekAPI.generateStage1Quiz();
    
//     // Add questionId to each question
//     const questions = quizData.questions.map((q, index) => ({
//       ...q,
//       questionId: `q1_${index + 1}`
//     }));

//     // Save to database
//     const quiz = await Quiz.create({
//       stage: 1,
//       category: "general",
//       scope: "global",
//       title: quizData.title,
//       description: quizData.description,
//       estimatedTime: quizData.estimatedTime,
//       questions,
//       isAiGenerated: true,
//       isActive: true
//     });

//     console.log("✓ Stage 1 quiz created successfully");

//     res.json({ 
//       success: true,
//       message: "Stage 1 quiz generated successfully",
//       quiz: {
//         _id: quiz._id,
//         title: quiz.title,
//         questionsCount: quiz.questions.length
//       }
//     });

//   } catch (error) {
//     console.error("✗ Error in seedStage1Quiz:", error.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 1 quiz",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/stage2
//  * Generate and save Stage 2 quizzes and career options
//  */
// export const seedStage2Data = async (req, res) => {
//   try {
//     const interests = ["tech", "creative", "business", "health", "education"];
//     const results = {
//       careerOptions: [],
//       quizzes: []
//     };

//     for (const interest of interests) {
//       console.log(`\n📌 Processing ${interest}...`);

//       // 1. Generate career options
//       const existingCareerOptions = await CareerOptions.findOne({ 
//         detectedInterest: interest 
//       });

//       if (!existingCareerOptions) {
//         console.log(`  → Generating career options for ${interest}...`);
        
//         const careerData = await deepseekAPI.generateCareerOptions(interest);
        
//         const careerOptions = await CareerOptions.create({
//           detectedInterest: interest,
//           interestLabel: careerData.interestLabel,
//           interestDescription: careerData.interestDescription,
//           stage2Question: careerData.stage2Question,
//           options: careerData.options,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.careerOptions.push({
//           interest,
//           _id: careerOptions._id,
//           optionsCount: careerOptions.options.length
//         });

//         console.log(`  ✓ Career options created (${careerOptions.options.length} options)`);
//       } else {
//         console.log(`  ⊘ Career options already exist`);
//         results.careerOptions.push({
//           interest,
//           _id: existingCareerOptions._id,
//           optionsCount: existingCareerOptions.options.length,
//           skipped: true
//         });
//       }

//       // 2. Generate Stage 2 quiz
//       const existingQuiz = await Quiz.findOne({ 
//         stage: 2, 
//         category: interest 
//       });

//       if (!existingQuiz) {
//         console.log(`  → Generating Stage 2 quiz for ${interest}...`);
        
//         const quizData = await deepseekAPI.generateStage2Quiz(interest);
        
//         const questions = quizData.questions.map((q, index) => ({
//           ...q,
//           questionId: `q2_${interest}_${index + 1}`
//         }));

//         const quiz = await Quiz.create({
//           stage: 2,
//           category: interest,
//           scope: "global",
//           title: quizData.title,
//           description: quizData.description,
//           estimatedTime: quizData.estimatedTime,
//           questions,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.quizzes.push({
//           interest,
//           _id: quiz._id,
//           questionsCount: quiz.questions.length
//         });

//         console.log(`  ✓ Stage 2 quiz created (${quiz.questions.length} questions)`);
//       } else {
//         console.log(`  ⊘ Stage 2 quiz already exists`);
//         results.quizzes.push({
//           interest,
//           _id: existingQuiz._id,
//           questionsCount: existingQuiz.questions.length,
//           skipped: true
//         });
//       }

//       // Add delay to avoid rate limiting
//       if (interest !== interests[interests.length - 1]) {
//         console.log(`  ⏳ Waiting 3 seconds...`);
//         await new Promise(resolve => setTimeout(resolve, 3000));
//       }
//     }

//     console.log("\n✓ Stage 2 data generation complete!");

//     res.json({ 
//       success: true,
//       message: "Stage 2 data generated successfully",
//       results
//     });

//   } catch (error) {
//     console.error("✗ Error in seedStage2Data:", error.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 2 data",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/stage3/:career
//  * Generate common Stage 3 quizzes for a specific career
//  */
// export const seedStage3QuizzesForCareer = async (req, res) => {
//   try {
//     const { career } = req.params;
//     const { topics } = req.body;

//     if (!topics || !Array.isArray(topics) || topics.length === 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Topics array is required"
//       });
//     }

//     console.log(`\n📚 Generating Stage 3 quizzes for ${career}`);
//     const results = [];

//     for (const topic of topics) {
//       console.log(`\n  → Topic: ${topic}`);

//       const existing = await Quiz.findOne({
//         stage: 3,
//         category: career,
//         topic,
//         scope: "global"
//       });

//       if (existing) {
//         console.log(`    ⊘ Quiz already exists`);
//         results.push({
//           topic,
//           _id: existing._id,
//           skipped: true
//         });
//         continue;
//       }

//       const prompt = `Generate 10 quiz questions about "${topic}" for someone learning ${career}.

// Requirements:
// - Mix of difficulty levels (3 beginner, 4 intermediate, 3 advanced)
// - Multiple choice questions with 4 options each
// - Include correct answer and brief explanation
// - Questions should test practical understanding

// Return ONLY valid JSON:
// {
//   "title": "Quiz: ${topic}",
//   "description": "Test your knowledge of ${topic}",
//   "questions": [
//     {
//       "question": "...",
//       "options": ["option1", "option2", "option3", "option4"],
//       "correctAnswer": "option1",
//       "explanation": "...",
//       "difficulty": "beginner",
//       "type": "mcq",
//       "points": 10
//     }
//   ]
// }`;

//       try {
//         const aiResponse = await deepseekAPI.generateQuiz(prompt);
//         const quizData = JSON.parse(aiResponse);

//         const questions = quizData.questions.map((q, index) => ({
//           ...q,
//           questionId: `q3_${career}_${topic.replace(/\s+/g, '_')}_${index + 1}`,
//           allowText: false
//         }));

//         const quiz = await Quiz.create({
//           stage: 3,
//           category: career,
//           topic,
//           scope: "global",
//           title: quizData.title,
//           description: quizData.description,
//           estimatedTime: 10,
//           questions,
//           isAiGenerated: true,
//           isActive: true,
//           aiPromptUsed: prompt
//         });

//         results.push({
//           topic,
//           _id: quiz._id,
//           questionsCount: quiz.questions.length
//         });

//         console.log(`    ✓ Quiz created (${quiz.questions.length} questions)`);

//         if (topic !== topics[topics.length - 1]) {
//           console.log(`    ⏳ Waiting 3 seconds...`);
//           await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//       } catch (topicError) {
//         console.error(`    ✗ Failed to generate quiz for ${topic}:`, topicError.message);
//         results.push({
//           topic,
//           error: topicError.message,
//           failed: true
//         });
//       }
//     }

//     console.log(`\n✓ Stage 3 generation complete for ${career}!`);

//     res.json({ 
//       success: true,
//       message: `Stage 3 quizzes for ${career} generated successfully`,
//       results
//     });

//   } catch (error) {
//     console.error("✗ Error in seedStage3QuizzesForCareer:", error.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to generate Stage 3 quizzes",
//       error: error.message 
//     });
//   }
// };

// /**
//  * POST /api/seed/all
//  * Generate all initial data (Stage 1, 2)
//  */
// export const seedAll = async (req, res) => {
//   try {
//     console.log("\n" + "=".repeat(50));
//     console.log("🚀 STARTING DATABASE SEED");
//     console.log("=".repeat(50));

//     const results = {
//       stage1: null,
//       stage2: null
//     };

//     // 1. Generate Stage 1
//     console.log("\n📝 STAGE 1: Initial Assessment Quiz");
//     console.log("-".repeat(50));
    
//     const existingStage1 = await Quiz.findOne({ stage: 1, category: "general" });
    
//     if (!existingStage1) {
//       console.log("→ Generating Stage 1 quiz...");
//       const quizData = await deepseekAPI.generateStage1Quiz();
      
//       const questions = quizData.questions.map((q, index) => ({
//         ...q,
//         questionId: `q1_${index + 1}`
//       }));

//       const stage1Quiz = await Quiz.create({
//         stage: 1,
//         category: "general",
//         scope: "global",
//         title: quizData.title,
//         description: quizData.description,
//         estimatedTime: quizData.estimatedTime,
//         questions,
//         isAiGenerated: true,
//         isActive: true
//       });

//       results.stage1 = {
//         _id: stage1Quiz._id,
//         questionsCount: stage1Quiz.questions.length
//       };
      
//       console.log(`✓ Stage 1 quiz created (${stage1Quiz.questions.length} questions)`);
//     } else {
//       console.log("⊘ Stage 1 quiz already exists");
//       results.stage1 = { skipped: true, _id: existingStage1._id };
//     }

//     // 2. Generate Stage 2 data
//     console.log("\n📊 STAGE 2: Career Path Selection");
//     console.log("-".repeat(50));
    
//     const interests = ["tech", "creative", "business", "health", "education"];
//     results.stage2 = {
//       careerOptions: [],
//       quizzes: []
//     };

//     for (let i = 0; i < interests.length; i++) {
//       const interest = interests[i];
//       console.log(`\n[${i + 1}/${interests.length}] Processing: ${interest.toUpperCase()}`);

//       const existingCareerOptions = await CareerOptions.findOne({ 
//         detectedInterest: interest 
//       });

//       if (!existingCareerOptions) {
//         console.log("  → Generating career options...");
//         const careerData = await deepseekAPI.generateCareerOptions(interest);
        
//         const careerOptions = await CareerOptions.create({
//           detectedInterest: interest,
//           interestLabel: careerData.interestLabel,
//           interestDescription: careerData.interestDescription,
//           stage2Question: careerData.stage2Question,
//           options: careerData.options,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.stage2.careerOptions.push({
//           interest,
//           _id: careerOptions._id,
//           optionsCount: careerOptions.options.length
//         });
        
//         console.log(`  ✓ Career options created (${careerOptions.options.length} options)`);
//       } else {
//         console.log("  ⊘ Career options already exist");
//         results.stage2.careerOptions.push({
//           interest,
//           _id: existingCareerOptions._id,
//           skipped: true
//         });
//       }

//       const existingQuiz = await Quiz.findOne({ stage: 2, category: interest });

//       if (!existingQuiz) {
//         console.log("  → Generating Stage 2 quiz...");
//         const quizData = await deepseekAPI.generateStage2Quiz(interest);
        
//         const questions = quizData.questions.map((q, index) => ({
//           ...q,
//           questionId: `q2_${interest}_${index + 1}`
//         }));

//         const quiz = await Quiz.create({
//           stage: 2,
//           category: interest,
//           scope: "global",
//           title: quizData.title,
//           description: quizData.description,
//           estimatedTime: quizData.estimatedTime,
//           questions,
//           isAiGenerated: true,
//           isActive: true
//         });

//         results.stage2.quizzes.push({
//           interest,
//           _id: quiz._id,
//           questionsCount: quiz.questions.length
//         });
        
//         console.log(`  ✓ Stage 2 quiz created (${quiz.questions.length} questions)`);
//       } else {
//         console.log("  ⊘ Stage 2 quiz already exists");
//         results.stage2.quizzes.push({
//           interest,
//           _id: existingQuiz._id,
//           skipped: true
//         });
//       }

//       if (i < interests.length - 1) {
//         console.log("  ⏳ Waiting 3 seconds before next interest...");
//         await new Promise(resolve => setTimeout(resolve, 3000));
//       }
//     }

//     console.log("\n" + "=".repeat(50));
//     console.log("✓ DATABASE SEED COMPLETE!");
//     console.log("=".repeat(50));

//     res.json({ 
//       success: true,
//       message: "Database seeded successfully",
//       results
//     });

//   } catch (error) {
//     console.error("\n" + "=".repeat(50));
//     console.error("✗ SEED FAILED:", error.message);
//     console.error("=".repeat(50));
    
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to seed database",
//       error: error.message 
//     });
//   }
// };

// /**
//  * DELETE /api/seed/reset
//  * Delete all AI-generated content (for testing)
//  */
// export const resetSeedData = async (req, res) => {
//   try {
//     const { confirm } = req.body;

//     if (confirm !== "DELETE_ALL") {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Please send { confirm: "DELETE_ALL" } to proceed'
//       });
//     }

//     console.log("\n🗑️  Deleting all seed data...");

//     const deletedQuizzes = await Quiz.deleteMany({ isAiGenerated: true });
//     const deletedCareerOptions = await CareerOptions.deleteMany({});

//     console.log(`✓ Deleted ${deletedQuizzes.deletedCount} quizzes`);
//     console.log(`✓ Deleted ${deletedCareerOptions.deletedCount} career options`);

//     res.json({ 
//       success: true,
//       message: "All seed data deleted",
//       deleted: {
//         quizzes: deletedQuizzes.deletedCount,
//         careerOptions: deletedCareerOptions.deletedCount
//       }
//     });

//   } catch (error) {
//     console.error("✗ Error in resetSeedData:", error.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to reset seed data",
//       error: error.message 
//     });
//   }
// };

// export default {
//   seedStage1Quiz,
//   seedStage2Data,
//   seedStage3QuizzesForCareer,
//   seedAll,
//   resetSeedData
// };