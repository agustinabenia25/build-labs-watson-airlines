const express = require("express");
const router = express.Router();

const controller = require("../controllers/flights.controller");

router.get("/flights", controller.getFlights);
router.get("/flights/:id", controller.getFlightWithID);

module.exports = router;