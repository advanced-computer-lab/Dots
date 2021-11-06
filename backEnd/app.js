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


var cors = require('cors')

//App variables
const app = express();
const port = process.env.PORT || "8000";

// #Importing the userController
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads// configurations
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
passport.use(new LocalStrategy(Admin.authenticate()) )

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

app.post('/flights', (req, res) => {
     
  console.log(req.body);
  Flight.create({
    from : req.body.from, 
    flightTerminal: req.body.terminal,
    to: req.body.to, 
    flightDate: req.body.date,
    cabin: req.body.cabin,
    seatsAvailable: req.body.availableseats
  });
  res.redirect('http://localhost:3000/');
});

app.post('/flight/:flightId/delete', async(req, res) => {
  var id = mongoose.Types.ObjectId(req.params.flightId);
  await Flight.findByIdAndDelete(id);

  res.send("Flight Deleted");
});

app.get('/flights',async (req,res)=>{
  const flights = await Flight.find({});
  res.send(flights);
})

// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

const xlsx = require("xlsx");
var wb = xlsx.readFile("new Data.xlsx", { cellDates: true });
var ws = wb.Sheets['new Data'];

var data = xlsx.utils.sheet_to_json(ws);
const x = async function (data) {
  for (let d of data) {
    var f = new Flight();
    f.flightNumber=d['Flight Number'];
    f.from = d.From;
    f.to = d.To;
    f.departureTime=d['Departure Date'];
    f.arrivalTime=d['Arrival Date'];
    f.departureTerminal=d['Departure Terminal'];
    f.arrivalTerminal=d['Arrival Terminal'];
    f.cabin = d.Cabin;
    f.seatsAvailable = d['Seats Available on Flight'];
    await f.save();
  }
};

x(data);


