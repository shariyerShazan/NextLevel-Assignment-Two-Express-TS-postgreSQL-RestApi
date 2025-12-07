import {z} from "zod"

export const UpdateVehicleSchema = z.object({
    vehicle_name: z.string().min(1, { message: "Vehicle name cannot be empty" }).optional(),
  type: z.enum(["car", "bike", "van", "SUV"]).optional(),
  registration_number: z.string().min(1, { message: "Registration number cannot be empty" }).optional(),
  daily_rent_price: z.number().min(0, { message: "Daily rent must be at least 0" }).optional(),
  availability_status: z.enum(["available", "booked"]).optional(),

})

export type UpdateVehicleDto = z.infer< typeof UpdateVehicleSchema>