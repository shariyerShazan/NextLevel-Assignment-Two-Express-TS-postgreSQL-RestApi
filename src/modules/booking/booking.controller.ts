import type { Response } from "express";
import type { AuthRequest } from "../../middlewares/isAuthed.js";
import type { CreateBookingDto } from "./dto/create-booking-dto.js";
import { BookingServices } from "./booking.service.js";

export class BookingController {

    static createBooking = async (req: AuthRequest, res: Response) => {
        try {
            const dto: CreateBookingDto = req.body;
            const customerId = req.userId;

            const booking = await BookingServices.create(dto, customerId);

            return res.status(200).json({
                message: "Booking created successfully!",
                success: true,
                booking,
            });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                message: error.message || "Internal server error!",
                success: false,
            });
        }
    };


    static getBookings = async (req: AuthRequest, res: Response) => {
        try {
            const role = req.Role;
            const userId = req.userId;

            const bookings = await BookingServices.findAll(Role, userId);

            return res.status(200).json({
                message: "Here are the bookings!",
                success: true,
                bookings,
            });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                message: error.message || "Internal server error!",
                success: false,
            });
        }
    };


    static cancelBooking = async (req: AuthRequest, res: Response) => {
        try {
            const { bookingId } = req.params;

            const isCancelled = await BookingServices.cancel(bookingId, req.user.id);

            if (!isCancelled) {
                return res.status(400).json({
                    message: "Cannot cancel!",
                    success: false,
                });
            }

            return res.status(200).json({
                message: "Booking cancelled successfully!",
                success: true,
            });

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                message: error.message || "Internal server error!",
                success: false,
            });
        }
    };


    static markReturned = async (req: AuthRequest, res: Response) => {
        try {
            const { bookingId } = req.params;

            const isReturned = await BookingServices.markReturned(bookingId);

            if (!isReturned) {
                return res.status(400).json({
                    message: "Cannot mark as returned!",
                    success: false,
                });
            }

            return res.status(200).json({
                message: "Vehicle returned successfully!",
                success: true,
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
