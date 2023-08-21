const express = require("express");
const router = express.Router();

const controller = require("../controllers/airlines.controller");

router.get("/airlines", controller.getAirlines);

module.exports = router;