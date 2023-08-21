// Importing necessary modules
const path = require("path");
const express = require('express');
const mongoose = require('mongoose');

async function main(){

    // Get environmental variables from .example.env
    require("dotenv").config();

    // Database connection info, imported from the sample.mongodb file in the sample folder
    const { create_connection } = require("./sample/sample.mongodb");

    // Use the PORT environment variable or default to 8000
    const PORT = process.env.PORT || 8000;

    // Initiating the Express application
    const app = express();

    // Data parsing
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    // Route setup for API requests
    app.use('/api', require('./routes/airlines.route'));
    app.use('/api', require('./routes/airports.route'));
    app.use('/api', require('./routes/flights.route'));

    // GET route set up for the root URL
    app.get('/', (req, res) => {
        res.status(200).send({
            message: "Welcome to Watson Assistant!!"
        })
        console.log("Root URL request.");
    });

    // GET route set up for "About Watson Airlines"
    app.get('/about-watson-airlines', (req, res) => {
        res.status(200).send({
            message: "Watson Airlines is a one of the largest airlines in America. With over 30 years of history, we connect people to opportunities while expanding the understanding of our planet and the people within it. We offer our one-of-a-kind value and Hospitality at over 50 airports across more than 15 countries. In addition, we are members of the International Air Transport Association (IATA), a trade association that represents over 300 airlines, equivalent to about 83% of total air traffic. This allows us to operate safely, securely, efficiently, and economically under clearly defined rules. We are pioneers in the usage of technology, and actively advocate for its usage to improve our customer's experience."
        })
        console.log("About Watson Airlines request.");
    });

    // Connecting to MongoDB database
    create_connection()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
            });
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
        });
};

main();