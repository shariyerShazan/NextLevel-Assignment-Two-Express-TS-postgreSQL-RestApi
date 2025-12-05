import { Pool } from "pg"
import dotenv from "dotenv"
dotenv.config()

// database and connection
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: {
        rejectUnauthorized: false, 
      },
})
export const initDB = async () => {
   
  };
  