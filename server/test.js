

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import 'dotenv/config';

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// async function listModels() {
//     try {
//         console.log("Fetching available models...\n");
        
//         // Try different model names
//         const modelsToTry = [
//             "gemini-pro",
//             "gemini-1.5-pro",
//             "gemini-1.5-flash",
//             "gemini-1.5-flash-latest",
//             "gemini-1.5-pro-latest",
//             "models/gemini-pro",
//             "models/gemini-1.5-flash"
//         ];

//         for (const modelName of modelsToTry) {
//             try {
//                 console.log(`Testing: ${modelName}`);
//                 const model = genAI.getGenerativeModel({ model: modelName });
//                 const result = await model.generateContent("Hi");
//                 const text = result.response.text();
//                 console.log(`✓ ${modelName} - WORKS!`);
//                 console.log(`  Response: ${text.substring(0, 50)}...\n`);
//             } catch (error) {
//                 console.log(`✗ ${modelName} - ${error.message}\n`);
//             }
//         }

//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// listModels();










// import dotenv from 'dotenv';
// dotenv.config({ path: './server/.env' })

// import { OpenAI } from "openai";

// // Add this to verify it's loaded
// // console.log("API Key loaded:", process.env.GOOGLE_API_KEY ? "✅ YES" : "❌ NO");
// // console.log("First 10 chars:", process.env.GOOGLE_API_KEY?.substring(0, 10));
// // console.log("\n");

// const genAI = new OpenAI(process.env.OPENAI_API_KEY);

// async function testModels() {
//     console.log("Testing Gemini API...\n");
    
//     const modelsToTry = [
//         // "gemini-pro",
//         // "gemini-1.5-pro",
//         // "gemini-1.5-flash",
//         // "gemini-1.5-flash-latest",
//         // "gemini-1.5-pro-latest"
//         "nvidia/nemotron-nano-12b-v2-vl:free"
//     ];
    
//     for (const modelName of modelsToTry) {
//         try {
//             console.log(`Testing: ${modelName}...`);
//             const model = genAI.getGenerativeModel({ model: modelName });
//             const result = await model.generateContent("Say 'Hello'");
//             const text = result.response.text();
//             console.log(`✅ SUCCESS: ${modelName} works!`);
//             console.log(`Response: ${text}\n`);
//             break; // Stop at first working model
//         } catch (error) {
//             console.log(`❌ FAILED: ${modelName}`);
//             console.log(`Error: ${error.message}\n`);
//         }
//     }
// }

// testModels();




// import dotenv from 'dotenv';
// dotenv.config()

// import { OpenAI } from "openai";

// const genAI = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// async function testModel() {
//     const modelName = "nvidia/nemotron-nano-12b-v2-vl:free";

//     console.log(`Testing model: ${modelName}...\n`);

//     try {
//         const model = genAI.getGenerativeModel({ model: modelName });

//         const result = await model.generateContent("Say 'Hello'");
//         const text = result.response.text();

//         console.log(`✅ SUCCESS: ${modelName} works!`);
//         console.log(`Response: ${text}\n`);
//     } catch (error) {
//         console.log(`❌ FAILED: ${modelName}`);
//         console.log(`Error: ${error.message}\n`);
//     }
// }

// testModel();



// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// async function test() {
//     try {
//         const completion = await openai.chat.completions.create({
//             model: "nvidia/nemotron-nano-12b-v2-vl:free", // arcee-ai/trinity-mini:free
//             model: "arcee-ai/trinity-mini:free", // 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
//             messages: [
//                 {
//                     role: "user",
//                     content: "Say 'Hello'"
//                 }
//             ]
//         });

//         console.log("Response:", completion.choices[0].message.content);

//     } catch (err) {
//         console.error("Error:", err.message);
//     }
// }

// test();




import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

async function test() {
    // 1. Initialize the client (same as Python example)
    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        // apiKey: "sk-or-v1-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // your key
        apiKey: process.env.OPENAI_API_KEY, // your key
        // defaultHeaders: {
        //     "HTTP-Referer": "http://localhost",   // optional
        //     "X-Title": "Career App"              // optional
        // }
    });

    try {
        // 2. Make the API call (same structure as Python)
        const response = await client.chat.completions.create({
            model: "nvidia/nemotron-nano-9b-v2:free",
            // messages: [
            //     {
            //         role: "user",
            //         content: "Create resume for fresher B.Tech CSE student."
            //     }
            // ],

            messages: [
        {
          role: "system",
          content: "You are an expert quiz generator AI.",
        },
        {
          role: "user",
          content: `
Generate Stage-1 quiz questions.

Rules:
1. Create 5 MCQ questions.
2. Questions must be extremely simple (easy level).
3. Each question must have 4 options (A, B, C, D).
4. Only one correct answer.
5. At the end, write the answers in this format:
   Answers: 1-A, 2-B, 3-C, ...

Topic: General Knowledge.
          `,
        },
      ],

            temperature: 0.3,
            max_tokens: 256   // EXACTLY like Python example
        });

        // 3. Print the response
        console.log("AI Response:");
        console.log(response.choices[0].message.content);

    } catch (error) {
        console.error("Error:", error);
    }
}

test();





// import dotenv from 'dotenv';
// dotenv.config();

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// async function listModels() {
//     const models = await genAI.listModels();
//     console.log("Available models:", models.map(m => m.name));
// }

// listModels();
