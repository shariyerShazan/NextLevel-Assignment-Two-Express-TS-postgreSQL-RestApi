import { z } from "zod";

export const CreateBookingSchema = z.object({
    // customer_id: z.number().int().positive({ message: "Customer ID must be a positive integer" }),
    vehicle_id: z.number().int().positive({ message: "Vehicle ID must be a positive integer" }),
    rent_start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid start date format",
    }),
    rent_end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid end date format",
    }),
    // total_price: z.number().positive({ message: "Total price must be greater than zero" }),
    status: z.enum(["active", "cancelled", "returned"]).default("active"),
});


export type CreateBookingDto = z.infer<typeof CreateBookingSchema>;
