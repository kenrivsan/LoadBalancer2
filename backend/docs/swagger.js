const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "Documentación de la API del gestor de tareas"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./index.js"]
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec