// External variables

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");


const Flight = require('./models/flights');
const Admin = require('./models/admins')

const MongoURI = process.env.MONGO_URI;

const short = require('short-uuid');
const translator = short();


var cors = require('cors')

//App variables
const app = express();
const port = process.env.PORT || "8000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));
app.use(cors({ origin: true, credentials: true }));


// Flight.create({ from: "LAX", to: "JFK", flightDate: 2022-1-12, cabin: "Cairo"});


// -------------------------------- Login Authentication using passport ---------------------------------


const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()))

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser())

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

async function rand() {
  const rand = translator.generate().substring(0, 5);
  return rand;
}
app.post('/flights', async (req, res) => {
  console.log(req.body);
  try {
    Flight.create({
      flightNumber: req.body.flightNo,
      from: req.body.from,
      departureTerminal: req.body.departure,
      arrivalTerminal: req.body.arrival,
      to: req.body.to,
      departureTime: req.body.datedepart,
      arrivalTime: req.body.datearrive,
      economySeatsAvailable: (req.body.economyseats === null) ? 0 : req.body.economyseats,
      businessSeatsAvailable: (req.body.businessseats === null) ? 0 : req.body.businessseats,
      firstSeatsAvailable: (req.body.firstseats === null) ? 0 : req.body.firstseats,
      totalEconomySeats: (req.body.economyseats === null) ? 0 : req.body.economyseats,
      totalBusinessSeats: (req.body.businessseats === null) ? 0 : req.body.businessseats,
      totalFirstSeats: (req.body.firstseats === null) ? 0 : req.body.firstseats,
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect('http://localhost:3000/');
});


app.delete('/flight/:flightId/delete', async (req, res) => {
  var id = mongoose.Types.ObjectId(req.params.flightId);
  try {
    await Flight.findByIdAndDelete(id);
    res.send("Flight Deleted");
  } catch (error) {
    console.log(error);
  }


});

app.put('/flights/:flightId', async (req, res) => {
  const updateData = req.body
  delete updateData._id

  const searchId = mongoose.Types.ObjectId(req.params.flightId);

  try {
    const doc = await Flight.findByIdAndUpdate(searchId, updateData, { new: true });
    res.send(doc);
  } catch (error) {
    console.log(error);
  }
});

app.get('/flights', async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.send(flights);
  } catch (error) {
    res.send([]);
    console.log(error);
  }

})

app.get('/flights/:flightId', async (req, res) => {
  try {
    let flight = await Flight.findById(req.params.flightId).exec();
    res.send(flight);
  } catch (error) {
    console.log(error);
  }
})



app.post("/flights/flightquery", async (req, res) => {
  let body = req.body;
  let outward = req.body.out
  let inward = req.body.in


  let outDepDate = outward.dep;
  let inDepDate = inward.dep;
  let outClass = outward.class;
  let inClass = inward.class;


  let rawOutData = { "from": body.from, "to": body.to }
  let rawInData = { "from": body.to, "to": body.from }

  let outFlights = await Flight.find(rawOutData);
  let inFlights = await Flight.find(rawInData);

  let queryOutDate = new Date(outDepDate);
  let queryInDate = new Date(inDepDate);

  outDates = []
  inDates = []
  for (let i = 7; i > -8; i--) {
    let tempOut = new Date(queryOutDate);
    let tempIn = new Date(queryInDate);
    outDates.push(tempOut.setDate(tempOut.getDate() - i));
    inDates.push(tempIn.setDate(tempIn.getDate() - i));
  }


  let filteredOutFlights = outFlights.filter((flight) => {
    queryOutDate.setHours(0, 0, 0, 0);
    let flightDate = new Date(flight.departureTime);
    flightDate.setHours(0, 0, 0, 0);
    let difference = Math.abs(queryOutDate - flightDate);
    difference = difference / 1000 / 60 / 60 / 24;
    if (difference > 7) {
      return false;
    }
    else {
      let passengers = parseInt(body.kids) + parseInt(body.adults);
      switch (outClass) {
        case "economy": return flight.economySeatsAvailable >= passengers; break;
        case "business": return flight.businessSeatsAvailable >= passengers; break;
        case "first": return flight.firstSeatsAvailable >= passengers; break;
        default: return false;
      }

    }

  })


  let filteredInFlights = inFlights.filter((flight) => {
    queryInDate.setHours(0, 0, 0, 0);
    let flightDate = new Date(flight.arrivalTime);
    flightDate.setHours(0, 0, 0, 0);
    let difference = Math.abs(queryInDate - flightDate);
    difference = difference / 1000 / 60 / 60 / 24;
    if (difference > 7) {
      return false;
    }
    else {
      let passengers = parseInt(body.kids) + parseInt(body.adults);
      switch (inClass) {
        case "economy": return flight.economySeatsAvailable >= passengers; break;
        case "business": return flight.businessSeatsAvailable >= passengers; break;
        case "first": return flight.firstSeatsAvailable >= passengers; break;
        default: return false;
      }

    }

  })



  res.send({ "out": outDates, "in": inDates });

  ///////////////////// Do this once for departure and once for arrival 
  // Get all flights with the parameters except the dates and seats 
  // economy + business + first >= kids + adults 
  // Loop through the flights and set the time in all dates to 0 
  // filter the flights to get all flights before and after the dates by 7 days (n days to be generic)
  // get all unique dates and put them in a new array where the key is the date and the value is the set of flights in this date 

})




// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});




