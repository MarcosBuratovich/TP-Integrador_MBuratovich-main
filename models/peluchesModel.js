const mongoose = require("mongoose")

const pelucheSchema = new mongoose.Schema({
  user: {
    type: String,
    default: "",
  },
  opciones: {
    type: [String],
    enum: ["Perro", "Conejo", "Oso", "Mapache", "Gato"],
    default: ["Perro", "Conejo", "Oso", "Mapache", "Gato"],
  },
  color: {
    type: [String],
    enum: ["Rojo", "Verde", "Azul", "Blanco", "Negro"],
    default: ["Rojo", "Verde", "Azul", "Blanco", "Negro"],
  },
  accesorios: {
    type: [String],
    enum: ["Camiseta y Pelota de futbol", "Guitarra Electrica", "Notebook"],
    default: ["Camiseta y Pelota de futbol", "Guitarra Electrica", "Notebook"],
  },
})

const Peluche = mongoose.model("Peluches", pelucheSchema, "peluche")

module.exports = Peluche
