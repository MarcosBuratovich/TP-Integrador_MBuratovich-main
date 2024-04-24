const Peluche = require("../models/peluchesModel")
const sendMail = require("../services/emailService")
// funcion obtener todos moviles
const getALLpeluches = async (req, res) => {
  try {
    //  busca todo en la coleccion
    const peluches = await Peluche.find()
    // si la coleccion esta vacia
    if (peluches.length === 0) {
      return res.status(204).json({
        status: "Success",
        message: "No hay datos",
      })
    }
    // respuesta exitosa
    res.status(200).json({
      status: "success",
      data: peluches,
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      Message: "no se pudo encontrar productos",
      error: error.message,
    })
  }
}
// obtener moviles por ID

const getPeluchesByID = async (req, res) => {
  try {
    // obtiene el ID del REQ y lo busca en la coleccion
    const pelucheId = req.params.id
    const pelucheData = await Peluche.findById(pelucheId)
    console.log(pelucheData)
    // si no hay datos
    if (!pelucheData) {
      return res.status(204).json({
        status: "Success",
        message: "No hay datos",
      })
    }
    // si encuentra un movil con ese ID
    res.status(200).json({
      status: "success",
      data: pelucheData,
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      Message: "no se pudo encontrar el producto",
      error: error.message,
    })
  }
}

const postPeluche = (req, res) => {
  try {
    // crea una const para la informacion que entra por el body
    const { opciones, color, accesorios, user } = req.body
    // crea una const con un modelo "peluche" y le asigna los valores correspondientes del body
    const peluche = new Peluche({ opciones, color, accesorios, user })
    // guarda los cambios en la constante
    peluche.save()
    res.status(201).json({
      status: "success",
      data: peluche,
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      Message: "no se pudo crear el producto",
      error: error.message,
    })
  }
}

const patchPeluche = async (req, res) => {
  try {
    // crea una const para obtener el ID del body
    const pelucheId = req.params.id
    // crea una const para la informacion que entra por el body
    const { opciones, color, accesorios, user } = req.body
    // busca el movil por su ID
    const peluche = await Peluche.findById(pelucheId)
    // comprueba uno por uno si viene en la informacion del bosy, y si es asi la asigna al movil obtenido anteriormente
    if (opciones) {
      peluche.opciones = opciones
    }
    if (color) {
      peluche.color = color
    }
    if (accesorios) {
      peluche.accesorios = accesorios
    }
    if (user) {
      peluche.accesorios = user
    }
    // guarda los cambios en la constante
    peluche.save()
    res.status(200).json({
      status: "success",
      data: peluche,
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      Message: "no se pudo crear el producto",
      error: error.message,
    })
  }
}

const deletePeluche = async (req, res) => {
  try {
    const pelucheId = req.params.id
    const pelucheData = await Peluche.findByIdAndDelete(pelucheId)
    console.log(pelucheData)
    if (!pelucheData) {
      return res.status(200).json({
        status: "Success",
        message: "No hay datos para borrar",
      })
    }
    res.status(200).json({
      status: "success",
      message: "datos eliminados",
      data: pelucheData,
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      Message: "No se encuentra el ID para borrar",
      error: error.message,
    })
  }
}

module.exports = {
  getALLpeluches,
  getPeluchesByID,
  postPeluche,
  patchPeluche,
  deletePeluche,
}
