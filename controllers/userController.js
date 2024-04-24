const User = require("../models/userModel")
const verifyToken = require("../middlewares/auth")
// importa bcrypt para usarlo en el encriptado de password
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/utils")

const addUser = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { name, email, password, role } = req.body

    // Crear un nuevo usuario con los datos proporcionados
    const user = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10), // Encriptar la contraseña
      role: role,
    })

    // Guardar el usuario en la base de datos
    await user.save()

    // Responder con éxito: estado 200 y datos del usuario
    res.status(201).json({
      status: "success",
      data: user,
    })
  } catch (error) {
    // Si el error es un error de clave duplicada (código 11000)
    if (error.code === 11000) {
      res.status(400).json({
        status: "error",
        message: "Este email ya existe",
      })
    } else {
      // Responder con error general si no se pudo crear el usuario
      res.status(400).json({
        status: "error",
        message: "No se pudo crear el usuario",
        error: error.message,
      })
    }
  }
}

// funcion login

const login = async (req, res) => {
  try {
    // Extraer email y password del cuerpo de la solicitud
    const { email, password } = req.body

    // Buscar al usuario con el correo electrónico proporcionado
    const user = await User.findOne({ email: email })

    // Si el usuario existe
    if (user) {
      // Comparar la contraseña proporcionada con la almacenada en la base de datos (encriptada)
      const validPassword = await bcrypt.compare(password, user.password)

      // Si la contraseña es válida
      if (validPassword) {
        // Generar un token JWT para el usuario autenticado
        const payload = {
          userId: user._id,
          nombre: user.name,
          email: user.email,
          role: user.role,
        }
        const token = generateToken(payload, false)
        const tokenRefresh = generateToken(payload, true)

        // Responder con éxito: estado 200, datos del usuario y el token
        res.status(200).json({
          status: "success",
          data: user,
          token: token,
          token_refresh: tokenRefresh,
        })
      } else {
        // Si la contraseña no es válida, responder con error
        return res.status(200).json({
          status: "error",
          message: "Email y contraseña no coinciden",
        })
      }
    } else {
      // Si el usuario no existe, responder con error
      return res.status(200).json({
        status: "error",
        message: "Email y contraseña no coinciden",
      })
    }
  } catch (error) {
    // En caso de error, responder con estado 400 y mensaje de error
    res.status(400).json({
      status: "error",
      message: "No se ha podido hacer login",
      error: error.message,
    })
  }
}

const refreshToken = (req, res) => {
  try {
    // Obtiene el payload de la solicitud
    const payload = req.payload
    console.log(payload)

    // Si el payload no existe, retorna un error de acceso denegado
    if (!payload) return res.status(400).json({ error: "Acceso denegado" })

    // Crea un objeto de usuario basado en el payload
    const user = {
      userId: payload.userId,
      nombre: payload.name,
      email: payload.email,
    }

    // Genera un nuevo token y token de refresco
    const token = generateToken(user, false)
    const tokenRefresh = generateToken(user, true)

    // Responde con los nuevos tokens
    res.status(200).json({
      status: "success",
      data: {
        token,
        tokenRefresh,
      },
    })
  } catch (error) {
    // Maneja posibles errores durante el proceso
    res.status(400).json({
      status: "error",
      message: "No se ha podido refrescar el token",
      error: error.message,
    })
  }
}

module.exports = { addUser, login, refreshToken }
