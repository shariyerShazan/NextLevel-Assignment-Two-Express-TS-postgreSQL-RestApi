import { Router } from "express";
import { VehicleController } from "./vehicle.controller.js";
import { validate } from "../../middlewares/validate.js";
import { PostVehicleSchema } from "./dto/post-vehicle-dto.js";
import { authorize } from "../../middlewares/role-base-authorize.js";
import { UpdateVehicleSchema } from "./dto/update-vehicle-dto.js";
import { isAuthed } from "../../middlewares/isAuthed.js";

const router = Router()



/**
 * @swagger
 * tags:
 *   - name: Vehicles
 *     description: Vehicle management
 */

/**
 * @swagger
 * /api/v1/vehicles/:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicle_name:
 *                 type: string
 *                 example: "Toyota Corolla"
 *               type:
 *                 type: string
 *                 enum: [car, bike, van, SUV]
 *                 example: "car"
 *               registration_number:
 *                 type: string
 *                 example: "ABC-1234"
 *               daily_rent_price:
 *                 type: number
 *                 example: 50
 *               availability_status:
 *                 type: string
 *                 enum: [available, booked]
 *                 example: "available"
 *     responses:
 *       200:
 *         description: Vehicle created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Vehicle created successfully!"
 *               success: true
 *               vehicle:
 *                 id: 1
 *                 vehicle_name: "Toyota Corolla"
 *                 type: "car"
 *                 registration_number: "ABC-1234"
 *                 daily_rent_price: 50
 *                 availability_status: "available"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/" , validate(PostVehicleSchema), isAuthed, authorize(["admin"]) ,VehicleController.PostVehicle)


/**
 * @swagger
 * /api/v1/vehicles/:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of vehicles
 *         content:
 *           application/json:
 *             example:
 *               message: "Here is All vehicles!"
 *               success: true
 *               vehicles:
 *                 - id: 1
 *                   vehicle_name: "Toyota Corolla"
 *                   type: "car"
 *                   registration_number: "ABC-1234"
 *                   daily_rent_price: 50
 *                   availability_status: "available"
 *                 - id: 2
 *                   vehicle_name: "Honda Civic"
 *                   type: "car"
 *                   registration_number: "XYZ-5678"
 *                   daily_rent_price: 60
 *                   availability_status: "booked"
 */
router.get("/" , VehicleController.getAllVehicles)


/**
 * @swagger
 * /api/v1/vehicles/{vehicleId}:
 *   get:
 *     summary: Get a single vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Vehicle details
 *         content:
 *           application/json:
 *             example:
 *               message: "Here is vehicle!"
 *               success: true
 *               vehicle:
 *                 id: 1
 *                 vehicle_name: "Toyota Corolla"
 *                 type: "car"
 *                 registration_number: "ABC-1234"
 *                 daily_rent_price: 50
 *                 availability_status: "available"
 */
router.get("/:vehicleId" , VehicleController.getOneVehicle)


/**
 * @swagger
 * /api/v1/vehicles/{vehicleId}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicle_name:
 *                 type: string
 *                 example: "Honda Civic"
 *               type:
 *                 type: string
 *                 enum: [car, bike, van, SUV]
 *                 example: "car"
 *               registration_number:
 *                 type: string
 *                 example: "XYZ-5678"
 *               daily_rent_price:
 *                 type: number
 *                 example: 60
 *               availability_status:
 *                 type: string
 *                 enum: [available, booked]
 *                 example: "available"
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Vehicle updated successfully!"
 *               success: true
 *               vehicle:
 *                 id: 1
 *                 vehicle_name: "Honda Civic"
 *                 type: "car"
 *                 registration_number: "XYZ-5678"
 *                 daily_rent_price: 60
 *                 availability_status: "available"
 */
router.put("/:vehicleId"  , validate(UpdateVehicleSchema), isAuthed ,authorize(["admin"])  , VehicleController.updateVehicle )


/**
 * @swagger
 * /api/v1/vehicles/{vehicleId}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Vehicle deleted successfully"
 *               success: true
 *       400:
 *         description: Can't delete
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:vehicleId" , isAuthed , authorize(["admin"]) , VehicleController.deleteVehicle)

export default router