import { pool } from "../../utils/db.js";
import type { CreateBookingDto } from "./dto/create-booking-dto.js";

export class BookingServices {
  
  static async create(dto: CreateBookingDto, customerId: number) {

    const vehicle = await pool.query(
      `SELECT id, daily_rent_price, availability_status 
       FROM vehicles WHERE id = $1`,
      [dto.vehicle_id]
    );

    if (vehicle.rows.length === 0) {
      throw new Error("Vehicle not found!");
    }

    const v = vehicle.rows[0];
    if (v.availability_status !== "available") {
      throw new Error("Vehicle is not available right now!");
    }

    const start = new Date(dto.rent_start_date);
    const end = new Date(dto.rent_end_date);

    const diffrenceDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

    if (diffrenceDays <= 0) {
      throw new Error("End date must be after start date!");
    }

    const total_price = diffrenceDays * v.daily_rent_price;

    const booking = await pool.query(
      `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
       VALUES($1,$2,$3,$4,$5,'active')
       RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`,
      [customerId, dto.vehicle_id, dto.rent_start_date, dto.rent_end_date, total_price]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
      [dto.vehicle_id]
    );

    return booking.rows[0];
  }


  static async findAll(role: string, userId: number) {
    let query = "SELECT * FROM bookings";

    if (role !== "admin") {
      query = "SELECT * FROM bookings WHERE customer_id = $1";
      const result = await pool.query(query, [userId]);
      return result.rows;
    }

    const result = await pool.query(query);
    return result.rows;
  }


  static async cancel(bookingId: number, userId: number) {

    const result = await pool.query(
      `SELECT * FROM bookings WHERE id = $1`,
      [bookingId]
    );

    if (result.rows.length === 0) {
      throw new Error("Booking not found!");
    }

    const booking = result.rows[0];

    if (booking.customer_id !== userId) {
      throw new Error("You cannot cancel this booking!");
    }

    if (new Date() >= new Date(booking.rent_start_date)) {
      throw new Error("You cannot cancel after the start date!");
    }

    if(booking.status === "returned"){
        throw Error("Vehicle status already returned. You can't change returned status!")
    }

    await pool.query(
      `UPDATE bookings SET status = 'cancelled' WHERE id = $1`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id]
    );

    return true;
  }


  static async markReturned(bookingId: number) {

    const result = await pool.query(
      `SELECT * FROM bookings WHERE id = $1`,
      [bookingId]
    );

    if (result.rows.length === 0) {
      throw new Error("Booking not found!");
    }

    const booking = result.rows[0];

  if(booking.status === "cancelled"){
        throw Error("Vehicle status already cancelled. You can't change cancelled status!")
    }
    await pool.query(
      `UPDATE bookings SET status = 'returned' WHERE id = $1`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id]
    );

    return true;
  }
}
