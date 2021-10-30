// External variables

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require("express");
const mongoose = require('mongoose');

const Flight = require('./models/flights');
// Pick whether you want local connection or not.
// This part should be removed later when we start using the same database and only non-local connection should be used

const MongoURI = process.env.MONGO_URI ;


var cors = require('cors')

//App variables
const app = express();
const port = process.env.PORT || "8000";

// #Importing the userController
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));
app.use(cors({ origin: true, credentials: true }));

Flight.create({ from: "LAX", to: "JFK", flightDate: 2022-1-12, cabin: "Cairo"});


// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
