import express, { type Request, type Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { initDB } from "./utils/db.js"
dotenv.config()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"] ,
    credentials: true
}))
// app.use()


// Home routes
app.get("/" , (req: Request , res: Response)=> {
    try {
        res.status(200).json({
            message : "HOME API!!!" ,
            success: true
        })
    } catch (error : any) {
        console.log(error)
        res.status(500).json({
            message : "Internal server error!" ,
            success: false
        })
    }
})



// server listen
const PORT = process.env.PORT || 3333
const runServer = async ()=> {
    try {
        await initDB()
        app.listen(PORT , ()=> {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    } catch (error : any) {
        console.log(error)
    }
}
runServer()