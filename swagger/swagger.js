const swaggerJSDoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Peluches",
      version: "1.0.0",
      descripcion: " descripcion de la api",
    },
    server: {
      url: "http://localhost:3000",
      description: "servidor local",
    },
  },
  apis: [`${__dirname}/routers/*.js`],
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
