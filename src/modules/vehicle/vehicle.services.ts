import { pool } from "../../utils/db.js";
import type { PostVehicleDto } from "./dto/post-vehicle-dto.js";

export class VehicleServices {
    static async add(dto: PostVehicleDto){
       const existRegistration = await pool.query(`
        SELECT registration_number FROM vehicles WHERE registration_number = $1` , [dto.registration_number])
        if(existRegistration){
            throw Error("This registration number is taken by other user! Try deffirent")
        }
        const vehicle = await pool.query(`
            INSERT INTO vehicles(vehicle_name , type , registration_number , daily_rent_price , availability_status) VALUES($1 , $2 , $3 , $4 , $5) RETURNING id , vehicle_name , type , registration_number , daily_rent_price , availability_status` , [dto.vehicle_name , dto.type, dto.registration_number ,  dto.daily_rent_price , (dto.availability_status || "available") ])
        return vehicle.rows[0];
    }

    static async findAll(){
        const vehicles = await pool.query(`
            SELECT id, vehicle_name, type,  registration_number, daily_rent_price,  availability_status FROM vehicles`)
            if(vehicles.rows.length === 0){
                throw Error("No vehicles Available!")
            }
            return vehicles.rows
    }


    static async findOne(vehicleId: string){
        const vehicles = await pool.query(`
            SELECT id, vehicle_name, type,  registration_number, daily_rent_price,  availability_status FROM vehicles WHERE id = $1` , [vehicleId])
            if(vehicles.rows.length === 0){
                throw Error("No vehicles found!")
            }
            return vehicles.rows[0];
    }
}