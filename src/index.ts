import express, { type Request, type Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { initDB } from "./utils/db.js"
dotenv.config()
import AuthRouter from "./modules/auth/auth.routes.js"
import UserRouter from "./modules/user/user.routes.js"
import VehicleRouter from "./modules/vehicle/vehicle.route.js"
import BookingRouter from "./modules/booking/booking.routes.js"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js"



const app = express()

// middlewares 
// 
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"] ,
    credentials: true
}))
app.use(cookieParser())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Vehicle Rental API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
    },
  }))

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

// api here
app.use("/api/v1/auth" , AuthRouter)
app.use("/api/v1/users" , UserRouter)
app.use("/api/v1/vehicles" , VehicleRouter)
app.use("/api/v1/bookings" , BookingRouter)
// 404 handler


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