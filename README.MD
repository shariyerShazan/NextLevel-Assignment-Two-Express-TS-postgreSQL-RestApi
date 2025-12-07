# NextLevel Assignment Two - Vehicle Rental REST API

**Live URL:** [https://2-assignment-amber.vercel.app](https://2-assignment-amber.vercel.app)  
**API Documentation (Swagger):** [https://2-assignment-amber.vercel.app/docs/](https://2-assignment-amber.vercel.app/docs/)  
**GitHub Repository:** [https://github.com/shariyerShazan/NextLevel-Assignment-Two-Express-TS-postgreSQL-RestApi](https://github.com/shariyerShazan/NextLevel-Assignment-Two-Express-TS-postgreSQL-RestApi)

---

## Project Overview

This project is a **Vehicle Rental System REST API** built with **Express.js, TypeScript, and PostgreSQL**.  
It provides endpoints for managing **users, vehicles, and bookings**, with proper authentication, role-based authorization, and input validation.  

---

## Features

- User registration and login with authentication  
- Role-based authorization (`admin` and `customer`)  
- CRUD operations for vehicles  
- Booking management  
- Input validation using **Zod**  
- API documentation with **Swagger UI**  
- Fully deployable on **Vercel**  

---

## Technology Stack

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** PostgreSQL  
- **Validation:** Zod  
- **API Docs:** Swagger (OpenAPI 3.0)  
- **Deployment:** Vercel  

---

## Setup & Usage Instructions

### 1. Clone the repository

```bash
git clone https://github.com/shariyerShazan/NextLevel-Assignment-Two-Express-TS-postgreSQL-RestApi.git
cd NextLevel-Assignment-Two-Express-TS-postgreSQL-RestApi

npm install

###ENV
PORT=3333
DATABASE_URL=postgres://username:password@localhost:5432/your_database
JWT_SECRET=your_jwt_secret
BASE_PATH=/api
NODE_ENV=development

```
