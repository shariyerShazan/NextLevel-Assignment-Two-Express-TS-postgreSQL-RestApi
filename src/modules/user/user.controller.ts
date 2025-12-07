import type { Response, Request } from "express";
import type { AuthRequest } from "../../middlewares/isAuthed.js";
import { UserServices } from "./user.service.js";
import type { UpdateUserDto } from "./dto/update-user-dto.js";



export class UserController {
    static getUsers = async (req: AuthRequest, res: Response) => { 
        try {
            const users = await UserServices.findAll();  
            res.status(200).json({
                message: "All users Here!",
                users
            });
        } catch (error: any) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            const statusCode = error.message === "No user found!" ? 404 : 500;
            return res.status(statusCode).json({
                message: error.message || "Internal server error!",
                success: false,
            });
        }
    }

    static deleteCustomer = async (req: AuthRequest, res: Response) => {
        try {
            const { userId } = req.params;
            // const id = parseInt(userId);
            if (!userId) {
                return res.status(400).json({
                    message: "Invalid user ID",
                    success: false
                });
            }
            const isDeleted = await UserServices.delete(Number(userId));
            if(!isDeleted){
                return res.status(400).json({
                    message : "Can't delete!" ,
                    success: false
                })
            }
            return res.status(200).json({
                message: "User deleted successfully",
                success: true,
            });

        } catch (error: any) {
            console.log(error);
            const statusCode = error.message === "User not found!" ? 404 : 500;
            return res.status(statusCode).json({
                message: error.message || "Internal server error!",
                success: false
            });
        }
    }

    // Controller
static updateUser = async (req: AuthRequest, res: Response) => {
    try {
      const dto: UpdateUserDto = req.body;
      const userIdFromParam = Number(req.params.userId);

      if (req.Role === "customer" && Number(req.userId) !== userIdFromParam) {
        return res.status(403).json({
          message: "Forbidden: Cannot update other user's profile",
          success: false,
        });
      }
  
      const user = await UserServices.update(userIdFromParam, dto, req.Role as string);
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "User updated successfully!",
        success: true,
        user,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        message: error.message || "Internal server error!",
        success: false,
      });
    }
  };
  
}