import { z } from "zod";

export const CreateBookingSchema = z.object({
  customer_id: z
    .number()
    .int()
    .positive(),

  vehicle_id: z
    .number()
    .int()
    .positive(),

  rent_start_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid start date format",
    }),

  rent_end_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid end date format",
    }),

  total_price: z
    .number()
    .positive("Total price must be greater than zero"),

  status: z.enum(["active", "cancelled", "returned"]).default("active"),
});


export type CreateBookingDto = z.infer<typeof CreateBookingSchema>;
