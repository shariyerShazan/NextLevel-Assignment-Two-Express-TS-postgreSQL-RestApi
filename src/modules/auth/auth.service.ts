import bcrypt from "bcryptjs";
import { pool } from "../../utils/db.js";
import type { RegisterUserDto } from "./dto/register-user-dto.js";

export class AuthServices {
  static async register(dto: RegisterUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
      dto.email,
    ]);
    if (existing.rows.length > 0) {
      throw new Error("Email already exists");
    }
    const user = await pool.query(
      `INSERT INTO users(name,email,password,phone,role)
       VALUES($1,$2,$3,$4,$5)
       RETURNING id, name, email`,
      [dto.name, dto.email, hashed, dto.phone, dto.role]
    );

    return user.rows[0];
  }
}
