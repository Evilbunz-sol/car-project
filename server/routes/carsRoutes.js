const express = require("express")
const router = express.Router()

const {getCarById, getOptions} = require("../controllers/carsController")

router.get("/options", getOptions)

router.get("/:id", getCarById);

module.exports = router