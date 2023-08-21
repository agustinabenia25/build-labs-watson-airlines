const { request, response } = require("express");

// Mongoose Schemas
const Airports = require("../schemas/airports.schema");

/**
 * Sample Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const getAirports = async (req, res) => {
    // Returns all Airport objects under "result" field
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
                              "$ref": "#/components/schemas/Airport"
                            }
                        }
                    }
                }
              }
            }
        }   
    */
    try {

        console.log("Searching for airports...");

        const listOfAirports = await Airports.find({});
        // Rearranges list of airports in alphabetical order
        const resultAirports = listOfAirports.sort((a, b) => a.COUNTRY.localeCompare(b.COUNTRY));

        // Return query result
        res.json ({
            result : resultAirports
        });
    } catch (error) {
        res.json ({
            status : error.status
        });
    }
};

module.exports = {
    getAirports,
};