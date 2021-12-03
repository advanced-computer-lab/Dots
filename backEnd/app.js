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
const Admin = require('./models/admins');
const Reservation = require('./models/reservations');
const User = require('./models/users');


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
/*app.post('/flights', async (req, res) => {
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
        economySeatsAvailable: (req.body.economyseats === null )?0 : req.body.economyseats,
        businessSeatsAvailable: (req.body.businessseats === null )?0 : req.body.businessseats,
        firstSeatsAvailable: (req.body.firstseats === null )?0 : req.body.firstseats,
        totalEconomySeats: (req.body.economyseats === null )?0 : req.body.economyseats,
        totalBusinessSeats: (req.body.businessseats === null )?0 : req.body.businessseats,
        totalFirstSeats: (req.body.firstseats === null )?0 : req.body.firstseats,
      });
    } catch (error) {
      console.log(error);
    }
  res.redirect('http://localhost:3000/');
});*/


/*const flightOut = new Flight({
  _id: new mongoose.Types.ObjectId(),
  departureTime: new Date('2016-08-18T21:11:54'),
  arrivalTime: new Date('2017-08-18T21:11:54')
});
const flightIn = new Flight({
  _id: new mongoose.Types.ObjectId(),
  departureTime: new Date('2020-08-18T21:11:54'),
  arrivalTime: new Date('2023-08-18T21:11:54')
});
flightOut.save((err) => {
});
flightIn.save((err) => {
});
 Reservation.create({
  outBoundClass: "Economy",
  inBoundClass: "Business",
  outBoundflight: flightOut._id,
  inBoundflight: flightIn._id
});
*/


app.get('/userflights', async (req,res) => {
         var user = await User.find({});
         user = await user[0].populate('reservations');
         var reservations = user.reservations;
         for(let i = 0; i< reservations.length; i++){
           await reservations[i].populate('inBoundflight');
           await reservations[i].populate('outBoundflight');
           await reservations[i].populate('user');
         }
        res.json(reservations);
      });
    
/*app.get('/summary', async (req,res) =>{
  var inBoundflight = await Reservation.findOne({outBoundClass: "Economy"}).populate('inBoundflight');
  var outBoundFlight = await Reservation.findOne({outBoundClass: "Economy"}).populate('outBoundflight');
  console.log(allData.inBoundflight.departureTime);
});*/


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
  const seats = { seatsAvailable: updateData.seatsAvailable }
  const oldFN = updateData.oldFlightNumber

  delete updateData._id
  delete updateData.cabin
  delete updateData.oldFlightNumber
  delete updateData.seatsAvailable

  const searchId = mongoose.Types.ObjectId(req.params.flightId);

  try {
    const doc1 = await Flight.findByIdAndUpdate(searchId, seats, { new: true });
    const doc2 = await Flight.updateMany({ flightNumber: oldFN }, updateData);
    res.send(doc2);
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

// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});




