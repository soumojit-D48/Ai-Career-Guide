

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // Get the Gemini model
// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash" // or "gemini-1.5-pro" for better quality
// });

// /**
//  * Gemini API Service
//  */
// class GeminiService {

//     /**
//      * Analyze Stage 1 quiz answers and detect interest category
//      */
//     async analyzeInterest(prompt) {
//         try {
//             const result = await model.generateContent({ contents: prompt })
//                 ;
//             const response = await result.response;
//             // const text = response.text();
//             const text = result.response.text();

//             return text.trim();

//         } catch (error) {
//             console.error("Error in analyzeInterest:", error);
//             throw new Error("Failed to analyze interest with Gemini AI");
//         }
//     }

//     /**
//      * Generate roadmap based on career and user background
//      */
//     async generateRoadmap(prompt) {
//         try {
//             const result = await model.generateContent({ contents: prompt })
//                 ;
//             const response = await result.response;
//             let text = response.text();

//             // Clean up response (remove markdown code blocks if present)
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text); // Will throw if invalid

//             return text;

//         } catch (error) {
//             console.error("Error in generateRoadmap:", error);
//             throw new Error("Failed to generate roadmap with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 3 quiz questions
//      */
//     async generateQuiz(prompt) {
//         try {
//             const result = await model.generateContent({ contents: prompt })
//                 ;
//             const response = await result.response;
//             let text = response.text();

//             // Clean up response
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text);

//             return text;

//         } catch (error) {
//             console.error("Error in generateQuiz:", error);
//             throw new Error("Failed to generate quiz with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 1 initial assessment quiz
//      */
//     async generateStage1Quiz() {
//         const prompt = `Generate exactly 10 diverse questions for an initial career interest assessment.

// The questions should cover:
// 1. General interests (technology, arts, business, health, education, etc.)
// 2. Preferred work environment
// 3. Skills and strengths
// 4. Learning style
// 5. Career goals and aspirations
// 6. Problem-solving approach
// 7. Preferred tasks (analytical, creative, social, etc.)
// 8. Work-life priorities

// Requirements:
// - Mix of multiple choice (with 4 options) and text input questions
// - Questions should be clear, non-technical, and easy to understand
// - Answers should help identify if someone is interested in: tech, creative, business, health, or education fields
// - Include both MCQ questions with allowText: true (so users can choose or write their own answer)

// Return ONLY valid JSON in this exact format:
// {
//   "title": "Career Interest Assessment",
//   "description": "Help us understand your interests and goals",
//   "estimatedTime": 10,
//   "questions": [
//     {
//       "question": "What type of activities do you enjoy most in your free time?",
//       "options": ["Building or fixing things", "Creating art or content", "Reading about business", "Helping others"],
//       "type": "both",
//       "allowText": true
//     },
//     {
//       "question": "Describe your ideal work environment in a few words.",
//       "options": [],
//       "type": "text",
//       "allowText": true
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent({ contents: prompt })
//                 ;
//             const response = await result.response;
//             let text = response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const quizData = JSON.parse(text);

//             // Ensure exactly 10 questions
//             if (quizData.questions.length !== 10) {
//                 throw new Error("Generated quiz doesn't have exactly 10 questions");
//             }

//             return quizData;

//         } catch (error) {
//             console.error("Error in generateStage1Quiz:", error);
//             throw new Error("Failed to generate Stage 1 quiz with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 2 career selection quiz for specific interest
//      */
//     async generateStage2Quiz(interest) {
//         const interestContexts = {
//             tech: "technology, programming, software development, data, AI",
//             creative: "design, art, content creation, media production, writing",
//             business: "entrepreneurship, marketing, sales, management, consulting",
//             health: "healthcare, fitness, wellness, medicine, nutrition",
//             education: "teaching, training, curriculum development, educational technology"
//         };

//         const context = interestContexts[interest] || interest;

//         const prompt = `Generate exactly 10 questions to help someone interested in "${interest}" choose a specific career path within ${context}.

// The questions should explore:
// 1. Specific sub-interests within this field
// 2. Technical vs non-technical preferences
// 3. Hands-on vs strategic work
// 4. Independent vs team-based work
// 5. Creative vs analytical tasks
// 6. Short-term projects vs long-term initiatives
// 7. Specialization areas
// 8. Work style and approach

// Requirements:
// - Mix of multiple choice (4 options each) and text input
// - Questions should narrow down to specific careers
// - Include allowText: true for flexibility
// - Make questions practical and insightful

// Return ONLY valid JSON:
// {
//   "title": "Choose Your Path in ${interest}",
//   "description": "Discover which specific career suits you best",
//   "estimatedTime": 10,
//   "questions": [
//     {
//       "question": "...",
//       "options": ["...", "...", "...", "..."],
//       "type": "both",
//       "allowText": true
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent({ contents: prompt })
//                 ;
//             const response = await result.response;
//             let text = response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const quizData = JSON.parse(text);

//             if (quizData.questions.length !== 10) {
//                 throw new Error("Generated quiz doesn't have exactly 10 questions");
//             }

//             return quizData;

//         } catch (error) {
//             console.error("Error in generateStage2Quiz:", error);
//             throw new Error(`Failed to generate Stage 2 quiz for ${interest}`);
//         }
//     }

//     /**
//      * Generate career options based on interest
//      */
//     async generateCareerOptions(interest) {
//         const prompt = `Generate 5-8 career options for someone interested in "${interest}".

// For each career, provide:
// - value: slug format (e.g., "web-dev", "graphic-design")
// - label: Display name (e.g., "Web Development", "Graphic Design")
// - description: 1-2 sentence description
// - icon: Single relevant emoji
// - keywords: Array of related terms
// - difficulty: "beginner-friendly", "intermediate", or "advanced"
// - timeToLearn: Estimated time (e.g., "6-12 months", "1-2 years")
// - marketDemand: "high", "medium", or "low"
// - averageSalary: Salary range in INR or USD
// - prerequisites: Array of basic skills needed

// Return ONLY valid JSON:
// {
//   "interestLabel": "Technology",
//   "interestDescription": "...",
//   "stage2Question": "Which area of technology interests you most?",
//   "options": [
//     {
//       "value": "web-dev",
//       "label": "Web Development",
//       "description": "...",
//       "icon": "💻",
//       "keywords": ["websites", "html", "css"],
//       "difficulty": "beginner-friendly",
//       "timeToLearn": "6-12 months",
//       "marketDemand": "high",
//       "averageSalary": "₹6-15 LPA",
//       "prerequisites": ["Basic programming"],
//       "order": 1
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent({ contents: prompt })
//                 ;
//             const response = await result.response;
//             let text = response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const data = JSON.parse(text);

//             if (!data.options || data.options.length < 5) {
//                 throw new Error("Not enough career options generated");
//             }

//             return data;

//         } catch (error) {
//             console.error("Error in generateCareerOptions:", error);
//             throw new Error(`Failed to generate career options for ${interest}`);
//         }
//     }

//     /**
//      * General purpose text generation
//      */
//     async generate(prompt) {
//         try {
//             const result = await model.generateContent({ contents: prompt })
//                 ;
//             const response = await result.response;
//             return response.text();

//         } catch (error) {
//             console.error("Error in generate:", error);
//             throw new Error("Failed to generate content with Gemini AI");
//         }
//     }
// }

// // Export singleton instance
// export const geminiAPI = new GeminiService();

// export default geminiAPI;



































// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // Get the Gemini model
// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash" // or "gemini-1.5-pro" for better quality
// });

// /**
//  * Gemini API Service
//  */
// class GeminiService {

//     /**
//      * Analyze Stage 1 quiz answers and detect interest category
//      */
//     async analyzeInterest(prompt) {
//         try {
//             const result = await model.generateContent({ contents: prompt });
//             const text = result.response.text();

//             return text.trim();

//         } catch (error) {
//             console.error("Error in analyzeInterest:", error);
//             throw new Error("Failed to analyze interest with Gemini AI");
//         }
//     }

//     /**
//      * Generate roadmap based on career and user background
//      */
//     async generateRoadmap(prompt) {
//         try {
//             const result = await model.generateContent({ contents: prompt });
//             let text = result.response.text();

//             // Clean up response (remove markdown code blocks if present)
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text); // Will throw if invalid

//             return text;

//         } catch (error) {
//             console.error("Error in generateRoadmap:", error);
//             throw new Error("Failed to generate roadmap with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 3 quiz questions
//      */
//     async generateQuiz(prompt) {
//         try {
//             const result = await model.generateContent({ contents: prompt });
//             let text = result.response.text();

//             // Clean up response
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text);

//             return text;

//         } catch (error) {
//             console.error("Error in generateQuiz:", error);
//             throw new Error("Failed to generate quiz with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 1 initial assessment quiz
//      */
//     async generateStage1Quiz() {
//         const prompt = `Generate exactly 10 diverse questions for an initial career interest assessment.

// The questions should cover:
// 1. General interests (technology, arts, business, health, education, etc.)
// 2. Preferred work environment
// 3. Skills and strengths
// 4. Learning style
// 5. Career goals and aspirations
// 6. Problem-solving approach
// 7. Preferred tasks (analytical, creative, social, etc.)
// 8. Work-life priorities

// Requirements:
// - Mix of multiple choice (with 4 options) and text input questions
// - Questions should be clear, non-technical, and easy to understand
// - Answers should help identify if someone is interested in: tech, creative, business, health, or education fields
// - Include both MCQ questions with allowText: true (so users can choose or write their own answer)

// Return ONLY valid JSON in this exact format:
// {
//   "title": "Career Interest Assessment",
//   "description": "Help us understand your interests and goals",
//   "estimatedTime": 10,
//   "questions": [
//     {
//       "question": "What type of activities do you enjoy most in your free time?",
//       "options": ["Building or fixing things", "Creating art or content", "Reading about business", "Helping others"],
//       "type": "both",
//       "allowText": true
//     },
//     {
//       "question": "Describe your ideal work environment in a few words.",
//       "options": [],
//       "type": "text",
//       "allowText": true
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent({ contents: prompt });
//             let text = result.response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const quizData = JSON.parse(text);

//             // Ensure exactly 10 questions
//             if (quizData.questions.length !== 10) {
//                 throw new Error("Generated quiz doesn't have exactly 10 questions");
//             }

//             return quizData;

//         } catch (error) {
//             console.error("Error in generateStage1Quiz:", error);
//             throw new Error("Failed to generate Stage 1 quiz with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 2 career selection quiz for specific interest
//      */
//     async generateStage2Quiz(interest) {
//         const interestContexts = {
//             tech: "technology, programming, software development, data, AI",
//             creative: "design, art, content creation, media production, writing",
//             business: "entrepreneurship, marketing, sales, management, consulting",
//             health: "healthcare, fitness, wellness, medicine, nutrition",
//             education: "teaching, training, curriculum development, educational technology"
//         };

//         const context = interestContexts[interest] || interest;

//         const prompt = `Generate exactly 10 questions to help someone interested in "${interest}" choose a specific career path within ${context}.

// The questions should explore:
// 1. Specific sub-interests within this field
// 2. Technical vs non-technical preferences
// 3. Hands-on vs strategic work
// 4. Independent vs team-based work
// 5. Creative vs analytical tasks
// 6. Short-term projects vs long-term initiatives
// 7. Specialization areas
// 8. Work style and approach

// Requirements:
// - Mix of multiple choice (4 options each) and text input
// - Questions should narrow down to specific careers
// - Include allowText: true for flexibility
// - Make questions practical and insightful

// Return ONLY valid JSON:
// {
//   "title": "Choose Your Path in ${interest}",
//   "description": "Discover which specific career suits you best",
//   "estimatedTime": 10,
//   "questions": [
//     {
//       "question": "...",
//       "options": ["...", "...", "...", "..."],
//       "type": "both",
//       "allowText": true
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent({ contents: prompt });
//             let text = result.response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const quizData = JSON.parse(text);

//             if (quizData.questions.length !== 10) {
//                 throw new Error("Generated quiz doesn't have exactly 10 questions");
//             }

//             return quizData;

//         } catch (error) {
//             console.error("Error in generateStage2Quiz:", error);
//             throw new Error(`Failed to generate Stage 2 quiz for ${interest}`);
//         }
//     }

//     /**
//      * Generate career options based on interest
//      */
//     async generateCareerOptions(interest) {
//         const prompt = `Generate 5-8 career options for someone interested in "${interest}".

// For each career, provide:
// - value: slug format (e.g., "web-dev", "graphic-design")
// - label: Display name (e.g., "Web Development", "Graphic Design")
// - description: 1-2 sentence description
// - icon: Single relevant emoji
// - keywords: Array of related terms
// - difficulty: "beginner-friendly", "intermediate", or "advanced"
// - timeToLearn: Estimated time (e.g., "6-12 months", "1-2 years")
// - marketDemand: "high", "medium", or "low"
// - averageSalary: Salary range in INR or USD
// - prerequisites: Array of basic skills needed

// Return ONLY valid JSON:
// {
//   "interestLabel": "Technology",
//   "interestDescription": "...",
//   "stage2Question": "Which area of technology interests you most?",
//   "options": [
//     {
//       "value": "web-dev",
//       "label": "Web Development",
//       "description": "...",
//       "icon": "💻",
//       "keywords": ["websites", "html", "css"],
//       "difficulty": "beginner-friendly",
//       "timeToLearn": "6-12 months",
//       "marketDemand": "high",
//       "averageSalary": "₹6-15 LPA",
//       "prerequisites": ["Basic programming"],
//       "order": 1
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent({ contents: prompt });
//             let text = result.response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const data = JSON.parse(text);

//             if (!data.options || data.options.length < 5) {
//                 throw new Error("Not enough career options generated");
//             }

//             return data;

//         } catch (error) {
//             console.error("Error in generateCareerOptions:", error);
//             throw new Error(`Failed to generate career options for ${interest}`);
//         }
//     }

//     /**
//      * General purpose text generation
//      */
//     async generate(prompt) {
//         try {
//             const result = await model.generateContent({ contents: prompt });
//             return result.response.text();

//         } catch (error) {
//             console.error("Error in generate:", error);
//             throw new Error("Failed to generate content with Gemini AI");
//         }
//     }
// }

// // Export singleton instance
// export const geminiAPI = new GeminiService();

// export default geminiAPI;











































// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // Get the Gemini model
// const model = genAI.getGenerativeModel({
//     model: "gemini-2.5-flash" // or "gemini-1.5-pro" for better quality
// });

// /**
//  * Gemini API Service
//  */
// class GeminiService {

//     /**
//      * Analyze Stage 1 quiz answers and detect interest category
//      */
//     async analyzeInterest(prompt) {
//         try {
//             const result = await model.generateContent(prompt);
//             const text = result.response.text();

//             return text.trim();

//         } catch (error) {
//             console.error("Error in analyzeInterest:", error);
//             throw new Error("Failed to analyze interest with Gemini AI");
//         }
//     }

//     /**
//      * Generate roadmap based on career and user background
//      */
//     async generateRoadmap(prompt) {
//         try {
//             const result = await model.generateContent(prompt);
//             let text = result.response.text();

//             // Clean up response (remove markdown code blocks if present)
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text); // Will throw if invalid

//             return text;

//         } catch (error) {
//             console.error("Error in generateRoadmap:", error);
//             throw new Error("Failed to generate roadmap with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 3 quiz questions
//      */
//     async generateQuiz(prompt) {
//         try {
//             const result = await model.generateContent(prompt);
//             let text = result.response.text();

//             // Clean up response
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text);

//             return text;

//         } catch (error) {
//             console.error("Error in generateQuiz:", error);
//             throw new Error("Failed to generate quiz with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 1 initial assessment quiz
//      */
//     async generateStage1Quiz() {
//         const prompt = `Generate exactly 3 diverse questions for an initial career interest assessment.

// The questions should cover:
// 1. General interests (technology, arts, business, health, education, etc.)
// 2. Preferred work environment
// 3. Skills and strengths


// Requirements:
// - Mix of multiple choice (with 4 options) and text input questions
// - Questions should be clear, non-technical, and easy to understand
// - Answers should help identify if someone is interested in: tech, creative, business, health, or education fields
// - Include both MCQ questions with allowText: true (so users can choose or write their own answer)

// Return ONLY valid JSON in this exact format:
// {
//   "title": "Career Interest Assessment",
//   "description": "Help us understand your interests and goals",
//   "estimatedTime": 10,
//   "questions": [
//     {
//       "question": "What type of activities do you enjoy most in your free time?",
//       "options": ["Building or fixing things", "Creating art or content", "Reading about business", "Helping others"],
//       "type": "both",
//       "allowText": true
//     },
//     {
//       "question": "Describe your ideal work environment in a few words.",
//       "options": [],
//       "type": "text",
//       "allowText": true
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent(prompt);
//             let text = result.response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const quizData = JSON.parse(text);

//             // Ensure exactly 10 questions
//             if (quizData.questions.length !== 10) {
//                 throw new Error("Generated quiz doesn't have exactly 10 questions");
//             }

//             return quizData;

//         } catch (error) {
//             console.error("Error in generateStage1Quiz:", error);
//             throw new Error("Failed to generate Stage 1 quiz with Gemini AI");
//         }
//     }

//     /**
//      * Generate Stage 2 career selection quiz for specific interest
//      */
//     async generateStage2Quiz(interest) {
//         const interestContexts = {
//             tech: "technology, programming, software development, data, AI",
//             creative: "design, art, content creation, media production, writing",
//             business: "entrepreneurship, marketing, sales, management, consulting",
//             health: "healthcare, fitness, wellness, medicine, nutrition",
//             education: "teaching, training, curriculum development, educational technology"
//         };

//         const context = interestContexts[interest] || interest;

//         const prompt = `Generate exactly 10 questions to help someone interested in "${interest}" choose a specific career path within ${context}.

// The questions should explore:
// 1. Specific sub-interests within this field
// 2. Technical vs non-technical preferences
// 3. Hands-on vs strategic work
// 4. Independent vs team-based work
// 5. Creative vs analytical tasks
// 6. Short-term projects vs long-term initiatives
// 7. Specialization areas
// 8. Work style and approach

// Requirements:
// - Mix of multiple choice (4 options each) and text input
// - Questions should narrow down to specific careers
// - Include allowText: true for flexibility
// - Make questions practical and insightful

// Return ONLY valid JSON:
// {
//   "title": "Choose Your Path in ${interest}",
//   "description": "Discover which specific career suits you best",
//   "estimatedTime": 10,
//   "questions": [
//     {
//       "question": "...",
//       "options": ["...", "...", "...", "..."],
//       "type": "both",
//       "allowText": true
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent(prompt);
//             let text = result.response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const quizData = JSON.parse(text);

//             if (quizData.questions.length !== 10) {
//                 throw new Error("Generated quiz doesn't have exactly 10 questions");
//             }

//             return quizData;

//         } catch (error) {
//             console.error("Error in generateStage2Quiz:", error);
//             throw new Error(`Failed to generate Stage 2 quiz for ${interest}`);
//         }
//     }

//     /**
//      * Generate career options based on interest
//      */
//     async generateCareerOptions(interest) {
//         const prompt = `Generate 5-8 career options for someone interested in "${interest}".

// For each career, provide:
// - value: slug format (e.g., "web-dev", "graphic-design")
// - label: Display name (e.g., "Web Development", "Graphic Design")
// - description: 1-2 sentence description
// - icon: Single relevant emoji
// - keywords: Array of related terms
// - difficulty: "beginner-friendly", "intermediate", or "advanced"
// - timeToLearn: Estimated time (e.g., "6-12 months", "1-2 years")
// - marketDemand: "high", "medium", or "low"
// - averageSalary: Salary range in INR or USD
// - prerequisites: Array of basic skills needed

// Return ONLY valid JSON:
// {
//   "interestLabel": "Technology",
//   "interestDescription": "...",
//   "stage2Question": "Which area of technology interests you most?",
//   "options": [
//     {
//       "value": "web-dev",
//       "label": "Web Development",
//       "description": "...",
//       "icon": "💻",
//       "keywords": ["websites", "html", "css"],
//       "difficulty": "beginner-friendly",
//       "timeToLearn": "6-12 months",
//       "marketDemand": "high",
//       "averageSalary": "₹6-15 LPA",
//       "prerequisites": ["Basic programming"],
//       "order": 1
//     }
//   ]
// }`;

//         try {
//             const result = await model.generateContent(prompt);
//             let text = result.response.text();

//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const data = JSON.parse(text);

//             if (!data.options || data.options.length < 5) {
//                 throw new Error("Not enough career options generated");
//             }

//             return data;

//         } catch (error) {
//             console.error("Error in generateCareerOptions:", error);
//             throw new Error(`Failed to generate career options for ${interest}`);
//         }
//     }

//     /**
//      * General purpose text generation
//      */
//     async generate(prompt) {
//         try {
//             const result = await model.generateContent(prompt);
//             return result.response.text();

//         } catch (error) {
//             console.error("Error in generate:", error);
//             throw new Error("Failed to generate content with Gemini AI");
//         }
//     }
// }

// // Export singleton instance
// export const geminiAPI = new GeminiService();

// export default geminiAPI;





























import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// FIXED: Use correct model name
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash" // Correct model name (no "-latest" needed)
});

/**
 * Gemini API Service
 */
class GeminiService {

    /**
     * Analyze Stage 1 quiz answers and detect interest category
     */
    async analyzeInterest(prompt) {
        try {
            const result = await model.generateContent(prompt);
            const text = result.response.text();

            return text.trim();

        } catch (error) {
            console.error("Error in analyzeInterest:", error);
            throw new Error("Failed to analyze interest with Gemini AI");
        }
    }

    /**
     * Generate roadmap based on career and user background
     */
    async generateRoadmap(prompt) {
        try {
            const result = await model.generateContent(prompt);
            let text = result.response.text();

            // Clean up response (remove markdown code blocks if present)
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Validate JSON
            JSON.parse(text); // Will throw if invalid

            return text;

        } catch (error) {
            console.error("Error in generateRoadmap:", error);
            throw new Error("Failed to generate roadmap with Gemini AI");
        }
    }

    /**
     * Generate Stage 3 quiz questions
     */
    async generateQuiz(prompt) {
        try {
            const result = await model.generateContent(prompt);
            let text = result.response.text();

            // Clean up response
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Validate JSON
            JSON.parse(text);

            return text;

        } catch (error) {
            console.error("Error in generateQuiz:", error);
            throw new Error("Failed to generate quiz with Gemini AI");
        }
    }

    /**
     * Generate Stage 1 initial assessment quiz (SIMPLIFIED PROMPT)
     */
    async generateStage1Quiz() {
        const prompt = `Create 10 career assessment questions in JSON format.

Mix of question types:
- 6 multiple choice (4 options each)
- 4 text input

Cover topics: interests, work style, skills, goals.

JSON format:
{
  "title": "Career Interest Assessment",
  "description": "Discover your career path",
  "estimatedTime": 10,
  "questions": [
    {
      "question": "What activities do you enjoy?",
      "options": ["Tech work", "Creative projects", "Business tasks", "Helping others"],
      "type": "both",
      "allowText": true
    },
    {
      "question": "Describe your ideal work environment.",
      "options": [],
      "type": "text",
      "allowText": true
    }
  ]
}

Return ONLY valid JSON, no markdown.`;

        try {
            const result = await model.generateContent(prompt);
            let text = result.response.text();

            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            const quizData = JSON.parse(text);

            // Ensure exactly 10 questions
            if (quizData.questions.length !== 10) {
                throw new Error("Generated quiz doesn't have exactly 10 questions");
            }

            return quizData;

        } catch (error) {
            console.error("Error in generateStage1Quiz:", error);
            throw new Error("Failed to generate Stage 1 quiz with Gemini AI");
        }
    }

    /**
     * Generate Stage 2 career selection quiz for specific interest
     */
    async generateStage2Quiz(interest) {
        const prompt = `Create 10 questions to help choose a ${interest} career path.

Topics: sub-interests, technical preferences, work style, specializations.

JSON format:
{
  "title": "Choose Your ${interest} Path",
  "description": "Find your specific career",
  "estimatedTime": 10,
  "questions": [
    {
      "question": "What aspect interests you most?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "type": "both",
      "allowText": true
    }
  ]
}

Return ONLY valid JSON, no markdown.`;

        try {
            const result = await model.generateContent(prompt);
            let text = result.response.text();

            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            const quizData = JSON.parse(text);

            if (quizData.questions.length !== 10) {
                throw new Error("Generated quiz doesn't have exactly 10 questions");
            }

            return quizData;

        } catch (error) {
            console.error("Error in generateStage2Quiz:", error);
            throw new Error(`Failed to generate Stage 2 quiz for ${interest}`);
        }
    }

    /**
     * Generate career options based on interest
     */
    async generateCareerOptions(interest) {
        const prompt = `Create 6 career options for ${interest} interest.

JSON format:
{
  "interestLabel": "Technology",
  "interestDescription": "Tech careers description",
  "stage2Question": "Which tech area interests you?",
  "options": [
    {
      "value": "web-dev",
      "label": "Web Development",
      "description": "Build websites and web apps",
      "icon": "💻",
      "keywords": ["html", "css", "javascript"],
      "difficulty": "beginner-friendly",
      "timeToLearn": "6-12 months",
      "marketDemand": "high",
      "averageSalary": "₹6-15 LPA",
      "prerequisites": ["Basic programming"],
      "order": 1
    }
  ]
}

Return ONLY valid JSON, no markdown.`;

        try {
            const result = await model.generateContent(prompt);
            let text = result.response.text();

            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            const data = JSON.parse(text);

            if (!data.options || data.options.length < 5) {
                throw new Error("Not enough career options generated");
            }

            return data;

        } catch (error) {
            console.error("Error in generateCareerOptions:", error);
            throw new Error(`Failed to generate career options for ${interest}`);
        }
    }

    /**
     * General purpose text generation
     */
    async generate(prompt) {
        try {
            const result = await model.generateContent(prompt);
            return result.response.text();

        } catch (error) {
            console.error("Error in generate:", error);
            throw new Error("Failed to generate content with Gemini AI");
        }
    }
}

// Export singleton instance
export const geminiAPI = new GeminiService();

export default geminiAPI;