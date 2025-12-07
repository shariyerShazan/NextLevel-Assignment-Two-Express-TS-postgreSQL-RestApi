import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle Rental API",
      version: "1.0.0",
      description: "API documentation for Vehicle Rental System",
    },
    servers: [
      {
        url: "https://2-assignment-amber.vercel.app",
        description: "Production server",
      },
      {
        url: "http://localhost:3333",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  // ---- THIS IS THE FIX ----
  apis: [
    path.join(__dirname, "../modules/**/*.ts"), // For local dev
    path.join(__dirname, "../modules/**/*.js"), // For compiled Vercel runtime
    "modules/**/*.js" // Another fallback path for compiled files
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
