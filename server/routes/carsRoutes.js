const express = require("express");
const router = express.Router();

const { getCarDetails } = require("../controllers/carsController");

router.get("/:id", getCarDetails);

module.exports = router;
