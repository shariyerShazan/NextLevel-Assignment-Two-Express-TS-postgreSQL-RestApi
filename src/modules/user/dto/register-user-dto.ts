import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
  phone: z.string().min(1),
  role: z.enum(["admin", "customer"]),
});

// auto type 
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
