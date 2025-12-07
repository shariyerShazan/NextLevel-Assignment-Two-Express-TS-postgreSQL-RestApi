import { pool } from "../../utils/db.js";
import type { UpdateUserDto } from "./dto/update-user-dto.js";

export class UserServices{
    static async findAll() {
        try {
            const result = await pool.query(`
                SELECT id, name, email, phone, role 
                FROM users
            `);
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
        const existing = await pool.query("SELECT id, role FROM users WHERE id = $1", [userId]);
      
        if (existing.rows.length === 0) {
          throw new Error("User not found!");
        }
        const userToDeleteRole = existing.rows[0].role;
        if (userToDeleteRole === "admin") {
          throw new Error("Admin Cannot delete Other admin!");
        }
        await pool.query("DELETE FROM users WHERE id = $1 AND role = $2", [userId, "customer"]);
        return true;
      }
      


      static async update(userId: number, dto: UpdateUserDto, role: string) {
        const existing = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        if (existing.rows.length === 0) {
          throw new Error("User not found");
        }
      
        let updated;
        if (role === "admin" && dto.role) {
          updated = await pool.query(
            `UPDATE users
             SET 
                 role = $1
             WHERE id = $2
             RETURNING id, name, email, phone, role`,
            [dto.role, userId]
          );
        } else {
          updated = await pool.query(
            `UPDATE users
             SET name = $1,
                 phone = $2
             WHERE id = $3
             RETURNING id, name, email, phone, role`,
            [dto.name, dto.phone, userId]
          );
        }
      
        return updated.rows[0];
      }
      
}