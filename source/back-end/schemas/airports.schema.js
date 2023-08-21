const mongoose = require('mongoose');

const airports_schema = new mongoose.Schema({
  IATA_CODE: String,
  AIRPORT: String,
  CITY: String,
  STATE: String,
  COUNTRY: String,
});

const Airports = mongoose.model("Airports", airports_schema);

module.exports = Airports;