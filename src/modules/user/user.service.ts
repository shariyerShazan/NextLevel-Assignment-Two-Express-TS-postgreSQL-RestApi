import { pool } from "../../utils/db.js";
import type { UpdateUserDto } from "./dto/update-user-dto.js";

export class UserServices{
    static async findAll() {
        try {
            console.log('Executing query...'); 
            const result = await pool.query(`
                SELECT id, name, email, phone, role 
                FROM users
            `);
            console.log('Query result:', result.rows.length); 
            
            if(result.rows.length === 0){
                throw new Error("No user found!");
            }
            return result.rows;
        } catch (error) {
            console.error('Error in UserServices.findAll:', error);
            throw error;
        }
    }

      static async delete(userId: number) {
            const existing = await pool.query("SELECT id FROM users WHERE id = $1", [userId]);
            if (existing.rows.length === 0) {
            throw new Error("User not found!");
            }
            await pool.query("DELETE FROM users WHERE id = $1", [userId]);
            return true;
      }


      static async update(userId: number, dto: UpdateUserDto) {
        const existing = await pool.query("SELECT id FROM users WHERE id = $1", [userId]);
        if (existing.rows.length === 0) {
          throw new Error("User not found");
        }
        const updated = await pool.query(
          `UPDATE users
           SET name = $1,
               email = $2,
               phone = $3,
           WHERE id = $5
           RETURNING id, name, email, phone, role`,
          [dto.name, dto.email, dto.phone, userId]
        );
        return updated.rows[0];
      }
}