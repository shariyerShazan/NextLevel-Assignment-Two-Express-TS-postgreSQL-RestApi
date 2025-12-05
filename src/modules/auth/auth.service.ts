import bcrypt from "bcryptjs";
import { pool } from "../../utils/db.js";
import type { RegisterUserDto } from "./dto/register-user-dto.js";
import type { LoginUserDto } from "./dto/login-user-dto.js";

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
        `INSERT INTO users(name, email, password, phone, role)
         VALUES($1, $2, $3, $4, $5)
         RETURNING id, name, email, phone, role`,
        [dto.name, dto.email, hashed, dto.phone, 'customer'] // Explicitly pass 'customer'
    );

    return user.rows[0];
  }

  static async login(dto: LoginUserDto){
        const user = (
          await pool.query(
            "SELECT id, password, name, email, role FROM users WHERE email = $1",
            [dto.email]
          )
        ).rows[0];
        if (!user) {
          throw new Error("User not found with this email!");
        }
        const isMatchedPass = await bcrypt.compare(dto.password, user.password);
        if (!isMatchedPass) {
          throw new Error("Wrong password! Please try again.");
        }
        return user;
      }
}
