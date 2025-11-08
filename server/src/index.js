

import 'dotenv/config'
import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

import connectDB from "./config/dbConfig.js"
import cofigureCors from './config/corsConfig.js'
import {clerkMiddleware} from '@clerk/express'



import authRoutes from "./routes/authRoutes.js";


// dotenv.config()
const app = express()


const PORT = process.env.PORT || 3000
connectDB()

app.use(cors(cofigureCors()))
app.use(express.json())
app.use(cookieParser())

app.use(clerkMiddleware());

// app.get('/', (req, res) => res.send('api working fine'))


// Routes
app.use("/api/auth", authRoutes);



app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
