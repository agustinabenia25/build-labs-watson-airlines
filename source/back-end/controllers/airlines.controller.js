const { request, response } = require("express");

// Mongoose Schemas
const Airlines = require("../schemas/airlines.schema");

/**
 * Sample Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const getAirlines = async (req, res) => {
    // Returns all Airline objects under "result" field
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
                              "$ref": "#/components/schemas/Airline"
                            }
                        }
                    }
                }
              }
            }
        }   
    */
    try {
        
        console.log("Searching for airlines...");

        const listOfAirlines = await Airlines.find({});
        // Rearranges list of airlines in alphabetical order
        const resultAirlines = listOfAirlines.sort((a, b) => a.AIRLINE.localeCompare(b.AIRLINE));
        // Removes the IATA codes
        const result = resultAirlines.map(airline => airline.AIRLINE);
        
        // Return query result
        res.json ({
            result : result
        });
    } catch (error) {
        res.json ({
            status : error.status
        });
    }
};

module.exports = {
    getAirlines,
};