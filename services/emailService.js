const nodemailer = require("nodemailer")
const Peluche = require("../models/peluchesModel")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "marcosburatovich@gmail.com",
    pass: "Prueba123",
  },
})

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: "marcosburatovich@gmail.com",
      to: to,
      subject: subject,
      html: html,
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("error al enviar el mensaje", error.message)
  }
}

module.exports = sendEmail
