import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { CreateBookingSchema } from "./dto/create-booking-dto.js";
import { BookingController } from "./booking.controller.js";
import { isAuthed } from "../../middlewares/isAuthed.js";

const router = Router()


/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Booking management
 */

/**
 * @swagger
 * /api/v1/bookings/:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicle_id:
 *                 type: number
 *                 example: 1
 *               rent_start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-15"
 *               rent_end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-30"
 *     responses:
 *       200:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Booking created successfully!"
 *               success: true
 *               booking:
 *                 id: 1
 *                 customer_id: 2
 *                 vehicle_id: 1
 *                 rent_start_date: "2025-12-15"
 *                 rent_end_date: "2025-12-30"
 *                 total_price: 250
 *                 status: "active"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/" , isAuthed, validate(CreateBookingSchema) , BookingController.createBooking)


/**
 * @swagger
 * /api/v1/bookings/:
 *   get:
 *     summary: Get all bookings for the authenticated user (Admin get all the booking. and customer only get his bookked list!)
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             example:
 *               message: "Here are your bookings!"
 *               success: true
 *               bookings:
 *                 - id: 1
 *                   customer_id: 2
 *                   vehicle_id: 1
 *                   rent_start_date: "2025-12-15"
 *                   rent_end_date: "2025-12-30"
 *                   total_price: 250
 *                   status: "active"
 *                 - id: 2
 *                   customer_id: 2
 *                   vehicle_id: 3
 *                   rent_start_date: "2025-12-15"
 *                   rent_end_date: "2025-12-30"
 *                   total_price: 120
 *                   status: "cancelled"
 */
router.get("/" , isAuthed, BookingController.getBookings)



/**
 * @swagger
 * /api/v1/bookings/{bookingId}:
 *   put:
 *     summary: Update booking status (admin can update status ="returned" or customer can update status ="cancelled") {Addmin can't change when status="cancelled", and Customer can't change or cancel booking When status ="returned" }
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Booking status updated!"
 *               success: true

 *       400:
 *         description: Cannot update booking
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.put("/:bookingId" , isAuthed , BookingController.updateBookingStatus)

export default router