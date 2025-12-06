import {z} from "zod"

export const PostVehicleSchema = z.object({
    vehicle_name : z.string().nonempty(),
    type : z.enum([	'car', 'bike', 'van', 'SUV']),
    registration_number: z.string().nonempty(),
    daily_rent_price: z.number().min(0),
    availability_status : z.enum(["available" , "booked"]).optional()
})

export type PostVehicleDto = z.infer< typeof PostVehicleSchema>