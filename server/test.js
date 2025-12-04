

import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

async function test() {
    // 1. Initialize the client (same as Python example)
    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
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
