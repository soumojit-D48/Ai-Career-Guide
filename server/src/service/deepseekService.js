



import OpenAI from "openai";

// Initialize DeepSeek API (uses OpenAI-compatible format)
const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com"
});

/**
 * DeepSeek API Service
 */
class DeepSeekService {

    /**
     * Analyze Stage 1 quiz answers and detect interest category
     */
    async analyzeInterest(prompt) {
        try {
            const completion = await deepseek.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a career guidance assistant that analyzes user responses to determine their career interests."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
            });

            return completion.choices[0].message.content.trim();

        } catch (error) {
            console.error("Error in analyzeInterest:", error);
            throw new Error("Failed to analyze interest with DeepSeek");
        }
    }

    /**
     * Generate roadmap based on career and user background
     */
    async generateRoadmap(prompt) {
        try {
            const completion = await deepseek.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a career roadmap generator. Always respond with valid JSON only, no markdown or additional text."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            });

            let text = completion.choices[0].message.content;

            // Clean up response (remove markdown code blocks if present)
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Validate JSON
            JSON.parse(text);

            return text;

        } catch (error) {
            console.error("Error in generateRoadmap:", error);
            throw new Error("Failed to generate roadmap with DeepSeek");
        }
    }

    /**
     * Generate Stage 3 quiz questions
     */
    async generateQuiz(prompt) {
        try {
            const completion = await deepseek.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a quiz generator. Always respond with valid JSON only, no markdown or additional text."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            });

            let text = completion.choices[0].message.content;

            // Clean up response
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Validate JSON
            JSON.parse(text);

            return text;

        } catch (error) {
            console.error("Error in generateQuiz:", error);
            throw new Error("Failed to generate quiz with DeepSeek");
        }
    }

    /**
     * Generate Stage 1 initial assessment quiz
     */
    async generateStage1Quiz() {
        const prompt = `Create 10 career assessment questions in JSON format.

Question types:
- 6 multiple choice questions (4 options each)
- 4 text input questions

Topics to cover:
- General interests (technology, arts, business, health, education)
- Work environment preferences
- Skills and strengths
- Learning style
- Career goals

JSON format:
{
  "title": "Career Interest Assessment",
  "description": "Discover your career path",
  "estimatedTime": 10,
  "questions": [
    {
      "question": "What activities do you enjoy most?",
      "options": ["Tech projects", "Creative work", "Business tasks", "Helping others"],
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

Return ONLY valid JSON, no markdown or explanation.`;

        try {
            const completion = await deepseek.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a career assessment quiz generator. Always respond with valid JSON only."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            });

            let text = completion.choices[0].message.content;
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            const quizData = JSON.parse(text);

            // Ensure exactly 10 questions
            if (!quizData.questions || quizData.questions.length !== 10) {
                throw new Error("Generated quiz doesn't have exactly 10 questions");
            }

            return quizData;

        } catch (error) {
            console.error("Error in generateStage1Quiz:", error);
            throw new Error("Failed to generate Stage 1 quiz with DeepSeek");
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
            const completion = await deepseek.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a career path quiz generator. Always respond with valid JSON only."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            });

            let text = completion.choices[0].message.content;
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            const quizData = JSON.parse(text);

            if (!quizData.questions || quizData.questions.length !== 10) {
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
            const completion = await deepseek.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a career options generator. Always respond with valid JSON only."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            });

            let text = completion.choices[0].message.content;
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
            const completion = await deepseek.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
            });

            return completion.choices[0].message.content;

        } catch (error) {
            console.error("Error in generate:", error);
            throw new Error("Failed to generate content with DeepSeek");
        }
    }
}

// Export singleton instance
export const deepseekAPI = new DeepSeekService();

export default deepseekAPI;