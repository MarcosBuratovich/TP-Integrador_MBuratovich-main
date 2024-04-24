const jwt = require("jsonwebtoken");

// Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
  // Obtiene el token de la cabecera de la solicitud
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Acceso denegado: No se proporcionó token"); // Si no hay token, se devuelve un error de acceso denegado
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET); // Intenta verificar el token con la clave secreta principal
    req.payload = payload; // Si la verificación es exitosa, se guarda el payload en la solicitud
    next(); // Continua con el siguiente middleware o controlador
  } catch (error) {
    try {
      payload = jwt.verify(token, process.env.TOKEN_REFRESH); // Si la verificación anterior falla, intenta verificar con la clave de refresco
      req.payload = payload;
      next();
    } catch (error) {
      return res.status(400).send("Token inválido"); // Si ambos intentos fallan, se devuelve un error de token inválido
    }
  }
};

// Middleware para verificar el rol de administrador
const verifyRole = (req, res, next) => {
  try {
    const role = req.payload.role;
    if (!role || role === "user" ) {
      return res
        .status(403)
        .send("Acceso denegado: se requiere permiso de administrador");
    }
    next();
  } catch (error) {
   
    return res.status(400).send("No se puede leer el rol de administrador");
  }
};

module.exports = { verifyToken, verifyRole };
