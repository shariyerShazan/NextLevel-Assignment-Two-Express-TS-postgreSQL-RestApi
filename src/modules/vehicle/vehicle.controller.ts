import type { Response } from "express";
import type { AuthRequest } from "../../middlewares/isAuthed.js";
import type { PostVehicleDto } from "./dto/post-vehicle-dto.js";
import { VehicleServices } from "./vehicle.service.js";
import type { UpdateVehicleDto } from "./dto/update-vehicle-dto.js";
import { success } from "zod";



export class VehicleController {
    static PostVehicle = async (req: AuthRequest , res: Response)=>{
        try {
            const dto : PostVehicleDto = req.body
            const vehicle = await VehicleServices.add(dto)
            return res.status(200).json({
                message : "Vehicle created successfully!" ,
                vehicle ,
                success: true
            })
        } catch (error : any) {
            console.log(error)
            return res.status(500).json({
                message: error.message || "Internal server error!",
                success: false,
            });
        }  
    }

    static getAllVehicles = async (req: AuthRequest , res: Response)=>{
        try {
            const vehicles = await VehicleServices.findAll()
            return res.status(200).json({
                message : "Here is All vehicles!",
                success: true ,
                vehicles,
            })
        } catch (error : any) {
            console.log(error)
            return res.status(500).json({
                message: error.message || "Internal server error!",
                success: false,
            });
        }
    }

    static getOneVehicle = async (req: AuthRequest , res: Response)=>{
        try {
            const { vehicleId } = req.params;
            const vehicle = await VehicleServices.findOne(vehicleId as string)
            return res.status(200).json({
                message : "Here is vehicle!",
                success: true ,
                vehicle,
            })
        } catch (error : any) {
            console.log(error)
            return res.status(500).json({
                message: error.message || "Internal server error!",
                success: false,
            });
        }
    }

    static updateVehicle = async (req: AuthRequest , res: Response)=> {
          try {
            const { vehicleId } = req.params;
            const dto : UpdateVehicleDto = req.body
            const vehicle = await VehicleServices.update(vehicleId as string , dto)
             return res.status(200).json({
                message : "Vehicle updated successfully!",
                success: true ,
                vehicle
             })
          } catch (error : any) {
            console.log(error)
            return res.status(500).json({
                message: error.message || "Internal server error!",
                success: false,
            });
          }
    }

    static deleteVehicle = async (req: AuthRequest , res: Response)=> {
        try {
        const {vehicleId} = req.params
        if(!vehicleId){
            return res.status(404).json({
                message : "Vehicle is not found!",
                success: false ,
            })
         }
         const isDeleted = await VehicleServices.delete(vehicleId)
         if(!isDeleted){
            return res.status(400).json({
                message : "Can't delete!" ,
                success: false
            })
        }
        return res.status(200).json({
            message: "Vehicle deleted successfully",
            success: true,
        });
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({
                message: error.message || "Internal server error!",
                success: false,
            });
        }
    }
}