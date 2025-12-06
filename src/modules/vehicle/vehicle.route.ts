import { Router } from "express";
import { VehicleController } from "./vehicle.controller.js";
import { validate } from "../../middlewares/validate.js";
import { PostVehicleSchema } from "./dto/post-vehicle-dto.js";
import { authorize } from "../../middlewares/role-base-authorize.js";
import { UpdateVehicleSchema } from "./dto/update-vehicle-dto.js";

const router = Router()

router.post("/" , validate(PostVehicleSchema), authorize(["admin"]) ,VehicleController.PostVehicle)
router.get("/" , VehicleController.getAllVehicles)
router.get("/:vehicleId" , VehicleController.getOneVehicle)
router.put("/:vehicleId" , validate(UpdateVehicleSchema) ,authorize(["admin"])  , VehicleController.updateVehicle )
router.delete("/:vehicleId" , authorize(["admin"]) , VehicleController.deleteVehicle)

export default router