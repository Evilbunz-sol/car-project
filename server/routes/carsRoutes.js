const express = require("express");
const router = express.Router();

const { getCarDetails, getAllCars } = require("../controllers/carsController");

router.get("/", getAllCars);
router.get("/:id", getCarDetails);

module.exports = router;
