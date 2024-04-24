const crypto = require("crypto");

const secret = "token refresco";

const hash = crypto
  .createHmac("sha256", secret)
  .update("campo mas para aumentar seguridad")
  .digest("hex");

console.log(hash);
