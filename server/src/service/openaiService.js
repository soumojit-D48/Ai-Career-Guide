// import OpenAI from "openai";
// import dotenv from "dotenv"
// dotenv.config()

// // Initialize OpenAI API
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// /**
//  * OpenAI API Service
//  */
// class OpenAIService {

//     /**
//      * Analyze Stage 1 quiz answers and detect interest category
//      */
//     async analyzeInterest(prompt) {
//         try {
//             const completion = await openai.chat.completions.create({
//                 // model: "nvidia/nemotron-nano-12b-v2-vl:free", // or "gpt-4o" for better quality
//                 model: "tngtech/tng-r1t-chimera:free", // or "gpt-4o" for better quality
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a career guidance assistant that analyzes user responses to determine their career interests."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//             });

//             return completion.choices[0].message.content.trim();

//         } catch (error) {
//             console.error("Error in analyzeInterest:", error);
//             throw new Error("Failed to analyze interest with OpenAI");
//         }
//     }

//     /**
//      * Generate roadmap based on career and user background
//      */
//     async generateRoadmap(prompt) {
//         try {
//             const completion = await openai.chat.completions.create({
//                 model: "tngtech/tng-r1t-chimera:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a career roadmap generator. Always respond with valid JSON only, no markdown or additional text."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 response_format: { type: "json_object" }
//             });

//             let text = completion.choices[0].message.content;

//             // Clean up response (remove markdown code blocks if present)
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text); // Will throw if invalid

//             return text;

//         } catch (error) {
//             console.error("Error in generateRoadmap:", error);
//             throw new Error("Failed to generate roadmap with OpenAI");
//         }
//     }

//     /**
//      * Generate Stage 3 quiz questions
//      */
//     async generateQuiz(prompt) {
//         try {
//             const completion = await openai.chat.completions.create({
//                 model: "nvidia/nemotron-nano-12b-v2-vl:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a quiz generator. Always respond with valid JSON only, no markdown or additional text."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 response_format: { type: "json_object" }
//             });

//             let text = completion.choices[0].message.content;

//             // Clean up response
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text);

//             return text;

//         } catch (error) {
//             console.error("Error in generateQuiz:", error);
//             throw new Error("Failed to generate quiz with OpenAI");
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
//             const completion = await openai.chat.completions.create({
//                 model: "nvidia/nemotron-nano-12b-v2-vl:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a career assessment quiz generator. Always respond with valid JSON only, no markdown or additional text."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 response_format: { type: "json_object" }
//             });

//             let text = completion.choices[0].message.content;
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             const quizData = JSON.parse(text);

//             // Ensure exactly 10 questions
//             if (quizData.questions.length !== 10) {
//                 throw new Error("Generated quiz doesn't have exactly 10 questions");
//             }

//             return quizData;

//         } catch (error) {
//             console.error("Error in generateStage1Quiz:", error);
//             throw new Error("Failed to generate Stage 1 quiz with OpenAI");
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
//             const completion = await openai.chat.completions.create({
//                 model: "nvidia/nemotron-nano-12b-v2-vl:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a career path quiz generator. Always respond with valid JSON only, no markdown or additional text."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 response_format: { type: "json_object" }
//             });

//             let text = completion.choices[0].message.content;
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
//             const completion = await openai.chat.completions.create({
//                 model: "nvidia/nemotron-nano-12b-v2-vl:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a career options generator. Always respond with valid JSON only, no markdown or additional text."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 response_format: { type: "json_object" }
//             });

//             let text = completion.choices[0].message.content;
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
//             const completion = await openai.chat.completions.create({
//                 model: "nvidia/nemotron-nano-12b-v2-vl:free",
//                 messages: [
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//             });

//             return completion.choices[0].message.content;

//         } catch (error) {
//             console.error("Error in generate:", error);
//             throw new Error("Failed to generate content with OpenAI");
//         }
//     }
// }

// // Export singleton instance
// export const openaiAPI = new OpenAIService();

// export default openaiAPI;


































// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// // Initialize OpenRouter client (like your test.js)
// const client = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey: process.env.OPENAI_API_KEY,
//     // defaultHeaders: {
//     //     "HTTP-Referer": "http://localhost:3000",  // Your app URL
//     //     "X-Title": "AI Career Guide"               // Your app name
//     // }
// });

// /**
//  * OpenAI/OpenRouter API Service
//  */
// class OpenAIService {

//     /**
//      * Analyze Stage 1 quiz answers and detect interest category
//      */
//     async analyzeInterest(prompt) {
//         try {
//             const completion = await client.chat.completions.create({
//                 model: "nvidia/nemotron-nano-9b-v2:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a career guidance assistant that analyzes user responses to determine their career interests."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 max_tokens: 500
//             });

//             return completion.choices[0].message.content.trim();

//         } catch (error) {
//             console.error("Error in analyzeInterest:", error);
//             throw new Error("Failed to analyze interest with OpenAI");
//         }
//     }

//     /**
//      * Generate roadmap based on career and user background
//      */
//     async generateRoadmap(prompt) {
//         try {
//             const completion = await client.chat.completions.create({
//                 model: "nvidia/nemotron-nano-9b-v2:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a career roadmap generator. Always respond with valid JSON only, no markdown or additional text."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 max_tokens: 4000
//             });

//             let text = completion.choices[0].message.content;

//             // Clean up response (remove markdown code blocks if present)
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text); // Will throw if invalid

//             return text;

//         } catch (error) {
//             console.error("Error in generateRoadmap:", error);
//             throw new Error("Failed to generate roadmap with OpenAI");
//         }
//     }

//     /**
//      * Generate Stage 3 quiz questions
//      */
//     async generateQuiz(prompt) {
//         try {
//             const completion = await client.chat.completions.create({
//                 model: "nvidia/nemotron-nano-9b-v2:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a quiz generator. Always respond with valid JSON only, no markdown or additional text."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.7,
//                 max_tokens: 3000
//             });

//             let text = completion.choices[0].message.content;

//             // Clean up response
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

//             // Validate JSON
//             JSON.parse(text);

//             return text;

//         } catch (error) {
//             console.error("Error in generateQuiz:", error);
//             throw new Error("Failed to generate quiz with OpenAI");
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

// Return ONLY valid JSON in this exact format (no markdown, no extra text):
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
//             const completion = await client.chat.completions.create({
//                 model: "nvidia/nemotron-nano-9b-v2:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are an expert career assessment quiz generator. Respond ONLY with valid JSON, no markdown formatting."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.3,
//                 max_tokens: 3000
//             });

//             let text = completion.choices[0].message.content;
            
//             // Clean up any markdown or extra formatting
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            
//             // Remove any text before first { or after last }
//             const firstBrace = text.indexOf('{');
//             const lastBrace = text.lastIndexOf('}');
//             if (firstBrace !== -1 && lastBrace !== -1) {
//                 text = text.substring(firstBrace, lastBrace + 1);
//             }

//             const quizData = JSON.parse(text);

//             // Validate structure
//             if (!quizData.questions || !Array.isArray(quizData.questions)) {
//                 throw new Error("Invalid quiz structure: questions array missing");
//             }

//             // Ensure exactly 10 questions
//             if (quizData.questions.length !== 10) {
//                 throw new Error(`Generated quiz has ${quizData.questions.length} questions, expected 10`);
//             }

//             return quizData;

//         } catch (error) {
//             console.error("Error in generateStage1Quiz:", error);
//             throw new Error("Failed to generate Stage 1 quiz: " + error.message);
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

// Return ONLY valid JSON (no markdown, no extra text):
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
//             const completion = await client.chat.completions.create({
//                 model: "nvidia/nemotron-nano-9b-v2:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are an expert career path quiz generator. Respond ONLY with valid JSON, no markdown formatting."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.3,
//                 max_tokens: 3000
//             });

//             let text = completion.choices[0].message.content;
            
//             // Clean up markdown and extract JSON
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            
//             const firstBrace = text.indexOf('{');
//             const lastBrace = text.lastIndexOf('}');
//             if (firstBrace !== -1 && lastBrace !== -1) {
//                 text = text.substring(firstBrace, lastBrace + 1);
//             }

//             const quizData = JSON.parse(text);

//             // Validate
//             if (!quizData.questions || !Array.isArray(quizData.questions)) {
//                 throw new Error("Invalid quiz structure");
//             }

//             if (quizData.questions.length !== 10) {
//                 throw new Error(`Generated quiz has ${quizData.questions.length} questions, expected 10`);
//             }

//             return quizData;

//         } catch (error) {
//             console.error(`Error in generateStage2Quiz for ${interest}:`, error);
//             throw new Error(`Failed to generate Stage 2 quiz for ${interest}: ` + error.message);
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
// - averageSalary: Salary range in INR (e.g., "₹6-15 LPA")
// - prerequisites: Array of basic skills needed (e.g., ["Basic programming", "Problem solving"])
// - order: Number (1, 2, 3...)

// Return ONLY valid JSON (no markdown, no extra text):
// {
//   "interestLabel": "Technology",
//   "interestDescription": "Careers in technology and computing",
//   "stage2Question": "Which area of technology interests you most?",
//   "options": [
//     {
//       "value": "web-dev",
//       "label": "Web Development",
//       "description": "Build websites and web applications",
//       "icon": "💻",
//       "keywords": ["websites", "html", "css", "javascript"],
//       "difficulty": "beginner-friendly",
//       "timeToLearn": "6-12 months",
//       "marketDemand": "high",
//       "averageSalary": "₹6-15 LPA",
//       "prerequisites": ["Basic programming", "Problem solving"],
//       "order": 1
//     }
//   ]
// }`;

//         try {
//             const completion = await client.chat.completions.create({
//                 model: "nvidia/nemotron-nano-9b-v2:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are an expert career options generator. Respond ONLY with valid JSON, no markdown formatting."
//                     },
//                     {
//                         role: "user",
//                         content: prompt
//                     }
//                 ],
//                 temperature: 0.3,
//                 max_tokens: 3000
//             });

//             let text = completion.choices[0].message.content;
            
//             // Clean up markdown and extract JSON
//             text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            
//             const firstBrace = text.indexOf('{');
//             const lastBrace = text.lastIndexOf('}');
//             if (firstBrace !== -1 && lastBrace !== -1) {
//                 text = text.substring(firstBrace, lastBrace + 1);
//             }

//             const data = JSON.parse(text);

//             // Validate
//             if (!data.options || !Array.isArray(data.options)) {
//                 throw new Error("Invalid career options structure");
//             }

//             if (data.options.length < 5) {
//                 throw new Error(`Only ${data.options.length} options generated, expected 5-8`);
//             }

//             return data;

//         } catch (error) {
//             console.error(`Error in generateCareerOptions for ${interest}:`, error);
//             throw new Error(`Failed to generate career options for ${interest}: ` + error.message);
//         }
//     }

//     /**
//      * General purpose text generation
//      */
//     async generate(prompt, systemMessage = null) {
//         try {
//             const messages = [];
            
//             if (systemMessage) {
//                 messages.push({
//                     role: "system",
//                     content: systemMessage
//                 });
//             }
            
//             messages.push({
//                 role: "user",
//                 content: prompt
//             });

//             const completion = await client.chat.completions.create({
//                 model: "nvidia/nemotron-nano-9b-v2:free",
//                 messages,
//                 temperature: 0.7,
//                 max_tokens: 1000
//             });

//             return completion.choices[0].message.content;

//         } catch (error) {
//             console.error("Error in generate:", error);
//             throw new Error("Failed to generate content with OpenAI");
//         }
//     }
// }

// // Export singleton instance
// export const openaiAPI = new OpenAIService();

// export default openaiAPI;



























// openaiService.js
import OpenAI from "openai";

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
//   defaultHeaders: {
//     "HTTP-Referer": process.env.SITE_URL || "http://localhost:5000", // Optional, for rankings
//     "X-Title": process.env.SITE_NAME || "AI Career Guide", // Optional, shows in rankings
//   }
});

// Model configuration - easily switch models
const MODELS = {
  FAST: "nvidia/nemotron-nano-9b-v2:free",  
  BALANCED: "nvidia/nemotron-nano-9b-v2:free", 
  PREMIUM: "nvidia/nemotron-nano-9b-v2:free" 
};


export const openrouterAPI = {
  /**
   * Generate Stage 1 Quiz (Initial Assessment)
   * Uses balanced model for good quality
   */
  async generateStage1Quiz() {
    const prompt = `Generate a comprehensive initial assessment quiz to understand a user's interests, goals, and background.

Create 10 diverse questions that cover:
1. Current profession/student status
2. Areas of interest (tech, creative, business, health, education)
3. Learning goals and motivations
4. Time commitment availability
5. Prior experience/skills
6. Preferred learning style
7. Career aspirations
8. Personal interests/hobbies
9. Problem-solving preferences
10. Long-term vision

Each question should:
- Have 4 multiple choice options
- Allow custom text input (type: "both")
- Be open-ended enough to understand the person
- Not be too technical or intimidating

Return ONLY valid JSON in this exact format:
{
  "title": "Let's Get to Know You",
  "description": "Help us understand your interests and goals to create a personalized learning path",
  "estimatedTime": 10,
  "questions": [
    {
      "question": "What best describes your current situation?",
      "options": ["Student", "Working Professional", "Career Changer", "Freelancer/Entrepreneur"],
      "type": "both",
      "allowText": true
    }
  ]
}`;

    try {
      const completion = await openrouter.chat.completions.create({
        model: MODELS.BALANCED,
        messages: [
          {
            role: "system",
            content: "You are an expert career counselor and educational content creator. Generate engaging, inclusive quiz questions. Return only valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const response = completion.choices[0].message.content;
      
      // Log usage for monitoring
      console.log("✓ Stage 1 Quiz generated");
      console.log(`  Model: ${MODELS.BALANCED}`);
      if (completion.usage) {
        console.log(`  Tokens: ${completion.usage.total_tokens}`);
      }
      
      return JSON.parse(response);
    } catch (error) {
      console.error("Error generating Stage 1 quiz:", error);
      throw new Error(`Stage 1 quiz generation failed: ${error.message}`);
    }
  },

  /**
   * Generate Career Options for Stage 2
   * Uses balanced model
   */
  async generateCareerOptions(interest) {
    const interestDescriptions = {
      tech: "Technology and Software Development",
      creative: "Creative Arts and Design",
      business: "Business and Entrepreneurship",
      health: "Healthcare and Wellness",
      education: "Education and Teaching"
    };

//     const prompt = `Generate 5-8 specific career path options within the ${interestDescriptions[interest]} domain.

//     Generate exactly 10 questions for Stage 2. No more, no less.Generate exactly 10 questions for Stage 2. No more, no less.
// For each career, provide:
// - value: kebab-case identifier (e.g., "web-dev", "graphic-design")
// - label: Display name (e.g., "Web Development")
// - description: 2-3 sentence overview
// - icon: relevant emoji
// - keywords: 5-10 keywords for matching
// - difficulty: "beginner-friendly", "intermediate", or "advanced"
// - timeToLearn: realistic estimate (e.g., "6-12 months")
// - marketDemand: "high", "medium", or "low"
// - averageSalary: local currency range (e.g., "₹6-15 LPA" or "$60k-100k")
// - relatedCareers: array of related career values
// - prerequisites: array of prerequisite skills
// - order: number (1-8)

// Return ONLY valid JSON:
// {
//   "interestLabel": "${interestDescriptions[interest]}",
//   "interestDescription": "Brief description of this interest area",
//   "stage2Question": "Which specific path in ${interestDescriptions[interest]} interests you most?",
//   "options": [
//     {
//       "value": "career-id",
//       "label": "Career Name",
//       "description": "Career description",
//       "icon": "💻",
//       "keywords": ["keyword1", "keyword2"],
//       "difficulty": "beginner-friendly",
//       "timeToLearn": "6-12 months",
//       "marketDemand": "high",
//       "averageSalary": "₹6-15 LPA",
//       "relatedCareers": ["other-career"],
//       "prerequisites": ["basic skill"],
//       "order": 1
//     }
//   ]
// }`;

const prompt = `
Generate exactly 8 specific career path options within the ${interestDescriptions[interest]} domain.

tech, creative, business done next health, education

For each career, provide:
- value: kebab-case identifier (e.g., "web-dev", "graphic-design")
- label: Display name (e.g., "Web Development")
- description: 2-3 sentence overview
- icon: relevant emoji
- keywords: 5-10 keywords for matching
- difficulty: "beginner-friendly", "intermediate", or "advanced"
- timeToLearn: realistic estimate (e.g., "6-12 months")
- marketDemand: "high", "medium", or "low"   ← STRICT ENUM
- averageSalary: local currency range (e.g., "₹6-15 LPA" or "$60k-100k")
- relatedCareers: array of related career values
- prerequisites: array of prerequisite skills
- order: number (1–8)

IMPORTANT RULES:
- Generate EXACTLY 8 career options.
- Use ONLY these values for marketDemand: "high", "medium", "low".
- Use ONLY these values for difficulty: "beginner-friendly", "intermediate", "advanced".
- Return ONLY clean JSON, no markdown, no extra text.

Return JSON in this format:
{
  "interestLabel": "${interestDescriptions[interest]}",
  "interestDescription": "Brief description of this interest area",
  "stage2Question": "Which specific path in ${interestDescriptions[interest]} interests you most?",
  "options": []
}
`;


    try {
      const completion = await openrouter.chat.completions.create({
        model: MODELS.BALANCED,
        messages: [
          {
            role: "system",
            content: "You are a career counselor with deep knowledge of various industries. Provide realistic, accurate career information. Return only valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const response = completion.choices[0].message.content;
      
      console.log(`✓ Career options generated for ${interest}`);
      console.log(`  Model: ${MODELS.BALANCED}`);
      
      return JSON.parse(response);
    } catch (error) {
      console.error(`Error generating career options for ${interest}:`, error);
      throw new Error(`Career options generation failed: ${error.message}`);
    }
  },

  /**
   * Generate Stage 2 Quiz (Career refinement)
   * Uses fast model - simpler task
   */
  async generateStage2Quiz(interest) {
    const prompt = `Generate 10 questions to help users refine their career choice within ${interest}.

Questions should:
- Explore specific interests within this domain
- Assess technical vs creative vs business preferences
- Understand work style preferences (remote, team, solo)
- Gauge commitment level and learning pace
- Identify specific skills or tools of interest

Each question should have 4 options and allow custom text.

Return ONLY valid JSON:
{
  "title": "Refine Your ${interest} Path",
  "description": "Let's narrow down the perfect career path for you",
  "estimatedTime": 8,
  "questions": [
    {
      "question": "Question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "type": "both",
      "allowText": true
    }
  ]
}`;

    try {
      const completion = await openrouter.chat.completions.create({
        model: MODELS.FAST, // Using fast model for simpler task
        messages: [
          {
            role: "system",
            content: "You are a career counselor specializing in personalized career guidance. Return only valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const response = completion.choices[0].message.content;
      
      console.log(`✓ Stage 2 quiz generated for ${interest}`);
      console.log(`  Model: ${MODELS.FAST}`);
      
      return JSON.parse(response);
    } catch (error) {
      console.error(`Error generating Stage 2 quiz for ${interest}:`, error);
      throw new Error(`Stage 2 quiz generation failed: ${error.message}`);
    }
  },

  /**
   * Analyze Stage 1 answers to detect interest
   * Uses fast model - simple classification
   */
  async analyzeInterest(prompt) {
    try {
      const completion = await openrouter.chat.completions.create({
        model: MODELS.FAST, // Simple task, fast model is enough
        messages: [
          {
            role: "system",
            content: "You are an expert at analyzing career interests. Return ONLY ONE word: tech, creative, business, health, or education. No explanation, no punctuation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 10
      });

      const result = completion.choices[0].message.content.trim();
      console.log(`✓ Interest analyzed: ${result}`);
      
      return result;
    } catch (error) {
      console.error("Error analyzing interest:", error);
      throw new Error(`Interest analysis failed: ${error.message}`);
    }
  },

  /**
 * Generate personalized roadmap
 * Uses premium model for best quality
 */
async generateRoadmap(prompt) {
  try {
    const completion = await openrouter.chat.completions.create({
      model: MODELS.PREMIUM, // Use best model for roadmap generation
      messages: [
        {
          role: "system",
          content: "You are an expert curriculum designer and career mentor. Create comprehensive, practical learning roadmaps. Return only valid JSON with no markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    
    console.log("✓ Roadmap generated");
    console.log(`  Model: ${MODELS.PREMIUM}`);
    if (completion.usage) {
      console.log(`  Tokens: ${completion.usage.total_tokens}`);
    }
    
    return response;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error(`Roadmap generation failed: ${error.message}`);
  }
},

  /**
   * Generate Stage 3 quiz for specific topic
   * Uses balanced model
   */
  async generateQuiz(prompt) {
    try {
      const completion = await openrouter.chat.completions.create({
        model: MODELS.BALANCED,
        messages: [
          {
            role: "system",
            content: "You are an expert educator creating assessment quizzes. Generate questions that test practical understanding, not just memorization. Return only valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const response = completion.choices[0].message.content;
      
      console.log("✓ Stage 3 quiz generated");
      console.log(`  Model: ${MODELS.BALANCED}`);
      
      return response;
    } catch (error) {
      console.error("Error generating Stage 3 quiz:", error);
      throw new Error(`Stage 3 quiz generation failed: ${error.message}`);
    }
  },

  /**
   * Get available models (for admin/debugging)
   */
  async getAvailableModels() {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/models", {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      });
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching models:", error);
      return null;
    }
  }
};

// Export both the API and models config for easy access
export const AVAILABLE_MODELS = MODELS;

export default openrouterAPI;