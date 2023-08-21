const { request, response } = require("express");

// Mongoose Schemas
const Flights = require("../schemas/flights.schema");

/**
 * Sample Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const getFlights = async (req, res) => {
    // Returns all Flight objects under "result" field
    /* #swagger.responses[200] = {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                    "type" : "object",
                    "properties" : {
                        "result" : {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Flight"
                            }
                        }
                    }
                }
              }
            }
        }   
    */
    try {

        console.log("Searching for flights...");

        const listOfFlights = await Flights.find({});
        // Rearranges list of flights by how recent they are
        const resultFlights = listOfFlights.sort((a, b) => a.DEPARTURE_DATE - b.DEPARTURE_DATE);
        
        // Return query result
        res.json ({
            result : resultFlights
        });
    } catch (error) {
        res.json ({
            status : error.status
        });
    }
};

/**
 * Sample Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const getFlightWithID = async (req, res) => {
    // Returns the Flight object with the specific ID
    /* #swagger.responses[200] = {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                    "type" : "object",
                    "properties" : {
                        "result" : {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Flight"
                            }
                        }
                    }
                }
              }
            }
        }   
    */
    try {

        const flightId = req.params.id;

        console.log("Searching for flight with ID:", flightId);

        // Looks for the flight with the id requested
        const flight = await Flights.findById(flightId);

        // If not found, returns "Flight not found"
        if (!flight) {
            return res.status(404).json({
                message: "Flight not found"
            });
        }
        
        // Return query result
        res.json ({
            result : flight
        });
    } catch (error) {
        res.json ({
            status : error.status
        });
    }
};

module.exports = {
    getFlights,
    getFlightWithID
};