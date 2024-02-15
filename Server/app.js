import dotenv from 'dotenv'
import express from 'express'
import Router from './Routes/userRouts.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConn from './config/dbConnection.js'

dotenv.config()
const app = express()
dbConn()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
express.urlencoded({extended: true})

app.use('/', Router)

export default app