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
        url: "http://localhost:3333/",
      },
    ],
  },

  apis: [path.join(__dirname, "../modules/**/*.ts")],
};

export const swaggerSpec = swaggerJsdoc(options);
