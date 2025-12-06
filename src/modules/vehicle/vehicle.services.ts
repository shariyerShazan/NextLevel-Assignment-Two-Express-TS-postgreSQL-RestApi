import { pool } from "../../utils/db.js";
import type { PostVehicleDto } from "./dto/post-vehicle-dto.js";
import type { UpdateVehicleDto } from "./dto/update-vehicle-dto.js";

export class VehicleServices {
    static async add(dto: PostVehicleDto){
       const existRegistration = await pool.query(`
        SELECT registration_number FROM vehicles WHERE registration_number = $1` , [dto.registration_number])

        if (existRegistration.rows.length > 0) {
            throw new Error("This registration number is taken by another user! Try different");
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

    static async update(vehicleId: string, dto: UpdateVehicleDto) {
            const existing = await pool.query("SELECT id FROM vehicles WHERE id = $1", [vehicleId]);
            if (existing.rows.length === 0) {
              throw new Error("Vehicles not found");
            }
            const updated = await pool.query(
              `UPDATE vehicles
               SET vehicle_name = $1,
                   type = $2,
                   registration_number = $3,
                   daily_rent_price = $4,
                   availability_status = $5
               WHERE id = $6
              RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`,
              [dto.vehicle_name , dto.type , dto.registration_number , dto.daily_rent_price , dto.availability_status , vehicleId]
            );
            return updated.rows[0];
          }


          static async delete(vehicleId: string) {
            const existing = await pool.query("SELECT id, availability_status FROM vehicles WHERE id = $1", [vehicleId]);
          
            if (existing.rows.length === 0) {
                throw new Error("Vehicle not found!");
              }
            if (existing.rows[0].availability_status !== "available") {
              throw new Error("You can't delete Already Booked vehicles!");
            }
            await pool.query("DELETE FROM vehicles WHERE id = $1 AND availability_status = $2", [vehicleId, "available"]);
            return true;
          }
          
    
}