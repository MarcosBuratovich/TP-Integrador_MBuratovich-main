// Importar los módulos necesarios
const express = require("express")
const mongoose = require("mongoose")

const userRouter = require("./routers/userRouter")
const peluchesRouter = require("./routers/peluchesRouter")

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger/swagger")
const PORT = 3000

require("dotenv").config()
const app = express()
app.use(express.json())

const urlMongodb = process.env.DATABASE_URL_DEV

mongoose.connect(urlMongodb)

const db = mongoose.connection

db.on("error", (error) => {
  console.error("Error al conectar")
})

db.once("connected", () => {
  console.log("Success connected")
})

db.on("disconnected", () => {
  console.log("Mongo default connection disconnected")
})

app.use("/peluches", peluchesRouter)
app.use("/user", userRouter)
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`)
})
