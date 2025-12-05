

import 'dotenv/config'
// dotenv.config()
import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

import connectDB from "./config/dbConfig.js"
import cofigureCors from './config/corsConfig.js'
import {clerkMiddleware} from '@clerk/express'



import authRoutes from "./routes/authRoutes.js";
import quizRoutes from './routes/quizRoutes.js'
import seedRoutes from './routes/seedRoutes.js'
import userRoutes from './routes/userRoutes.js'


// dotenv.config()
const app = express()


const PORT = process.env.PORT || 3000
connectDB()

app.use(cors(cofigureCors()))
app.use(express.json())
app.use(cookieParser())

// app.use(clerkMiddleware());

// Routes
app.use("/api/seed", seedRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);


app.get('/', (req, res) => res.send('api working fine'))

app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
