const path = require("path");
const express = require('express');
const mongoose = require('mongoose');

// app.get('/api/flights/:id', flightController.getFlightWithID);

async function main(){

    // Get environmental variables
    require("dotenv").config();

    // Database connection info
    const { create_connection } = require("./sample/sample.mongodb");

    const PORT = process.env.PORT || 8000; // Use the PORT environment variable or default to 8000

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use('/api', require('./routes/airlines.route'));
    app.use('/api', require('./routes/airports.route'));
    app.use('/api', require('./routes/flights.route'));

    app.get('/', (req, res) => {
        res.status(200).send({
            message: "Welcome to Watson Assistant!!"
        })
    });

    create_connection() // Connect to the database
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