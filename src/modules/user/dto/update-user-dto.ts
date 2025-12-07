import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().min(1, { message: "Phone cannot be empty" }).optional(),
//   role: z.enum(["admin", "customer"]).optional()
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
