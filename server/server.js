import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'

dotenv.config()

const port = process.env.PORT || 5000;

connectDB();

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);


app.get("/", (req, res) => {
    res.send("server is running");
})

app.listen(port, () => console.log(`server is running on port ${port}`))