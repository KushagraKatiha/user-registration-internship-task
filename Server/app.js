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
    origin: 'http://localhost:5000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
express.urlencoded({extended: true})

app.get('/', Router)

export default app