const router = require("express").Router()
const { addUser, refreshToken, getUser } = require("../controllers/userController")
const { login } = require("../controllers/userController")
const { verifyToken } = require("../middlewares/auth")

router.post("/signup", addUser)
router.post("/login", login)
router.get("/refreshToken", verifyToken, refreshToken)
router.get("/getuser", verifyToken)

module.exports = router
