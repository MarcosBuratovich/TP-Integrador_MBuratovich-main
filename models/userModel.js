const mongoose = require("mongoose")
const Peluche = require("../models/peluchesModel")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  peluche: {
    type: Peluche,
    require: false,
  },
})

const User = mongoose.model("Users", userSchema)

module.exports = User
