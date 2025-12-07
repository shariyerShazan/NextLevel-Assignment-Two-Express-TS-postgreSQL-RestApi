import {z} from "zod"

export const PostVehicleSchema = z.object({
    vehicle_name: z.string().min(1, { message: "Vehicle name is required" }),
    type: z.enum(["car", "bike", "van", "SUV"]),
    registration_number: z.string().min(1, { message: "Registration number is required" }),
    daily_rent_price: z.number().min(0, { message: "Daily rent must be at least 0" }),
    availability_status: z.enum(["available", "booked"]).optional(),
})

export type PostVehicleDto = z.infer< typeof PostVehicleSchema>