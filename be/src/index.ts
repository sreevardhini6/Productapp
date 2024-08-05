import express from 'express'
import mongoose from 'mongoose'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import zod from 'zod'
import dotenv from 'dotenv'
import cors from 'cors'
import { mainRouter } from "./routes"
dotenv.config()

const app = express()
const PORT = process.env.PORT;
const DB = process.env.MONGO_URL as string;

app.use(express.json())
app.use(cors())
app.use("/api/v1", mainRouter)

mongoose.connect(DB)
.then(() => {
    console.log(`Database Connected at ${DB}`)
    })

    .catch((err) => {
        console.log("Database error::"+ err)
    })

    app.listen(PORT, () => {
        console.log(`Server connected to PORT:${PORT}`)
    })