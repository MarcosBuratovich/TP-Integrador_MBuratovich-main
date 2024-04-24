const router = require("express").Router()

const { getALLpeluches, getPeluchesByID, postPeluche, patchPeluche, deletePeluche, patchPeluche2 } = require("../controllers/peluchesControllers")

const { verifyToken, verifyRole } = require("../middlewares/auth")

router.get("/", getALLpeluches) //añadir verifytoken para usarlo

router.get("/:id", getPeluchesByID)

router.post("/create", postPeluche)

router.patch("/change/:id", patchPeluche)

router.delete("/delete/:id", deletePeluche)

module.exports = router
