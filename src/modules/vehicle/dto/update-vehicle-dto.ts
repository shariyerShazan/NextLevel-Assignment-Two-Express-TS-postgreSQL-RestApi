import {z} from "zod"

export const UpdateVehicleSchema = z.object({
    vehicle_name : z.string().optional(),
    type : z.enum([	'car', 'bike', 'van', 'SUV']).optional(),
    registration_number: z.string().optional(),
    daily_rent_price: z.number().min(0).optional(),
    availability_status : z.enum(["available" , "booked"]).optional().optional()
})

export type UpdateVehicleDto = z.infer< typeof UpdateVehicleSchema>