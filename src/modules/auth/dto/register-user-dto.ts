import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
  role: z.enum(["admin", "customer"])
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
