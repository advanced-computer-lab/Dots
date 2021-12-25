// External variables

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
//const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const Flight = require('./models/flights');
const Admin = require('./models/admins');
const Reservation = require('./models/reservations');
const User = require('./models/users')
const jwt = require('jsonwebtoken');
const MongoURI = process.env.MONGO_URI;
let alert = require("alert");
const short = require("short-uuid");
const translator = short();
const saltRounds = 10;
var cors = require("cors");

const stripeSK = 'sk_test_51K7gFNGx4Kq2M7uIDuWdTvjJmDVKIfKn9ilUGxGN9E29HfUGuFkp1lWRUaq9TojVSQoqxspIiuzl7tAxNdWcA1cW008U6almTb'
const stripe = require('stripe')(stripeSK);


//App variables
const app = express();
const port = process.env.PORT || "8000";
let repeated = false;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));
app.use(cors({ origin: true, credentials: true }));

//------------------nodemailer transporter--------------------
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
//--------------------------


// -------------------------------- Login Authentication using passport ---------------------------------

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(Admin.authenticate()))

// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser())

// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// });

//------------------------------------------authentication-----------------------------------------
const verifyAdmin = (req, res, next) => {
  if (req.verifiedUser.role !== 'admin') return res.sendStatus(403)
  next()
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).send()
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send()
    req.verifiedUser = user
    next()
  })
}

app.use((req, res, next) => {
  if (req.url === "/login" || req.url === "/flights" || req.url === "/flights/flightquery" || req.url === "/register")
    return next()
  else
    return verifyToken(req, res, next)
})

app.get("/checkAuth", (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (req.verifiedUser) {
    return res.status(200).send({ accessToken: token, role: req.verifiedUser.role, name: req.verifiedUser.name })
  }
  return res.sendStatus(401)
})

app.get("/checkAdmin", (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (req.verifiedUser.role === 'admin') return res.json({ accessToken: token, role: req.verifiedUser.role, name: req.verifiedUser.name })
  return res.sendStatus(403)
})

app.post("/login", (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isPasswordCorrect) => {
          if (isPasswordCorrect) {
            const payload = { id: user._id, name: user.firstName, role: 'user' }
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
              if (err) return res.json({ msg: err })
              return res.json({
                accessToken: token,
                name: user.firstName,
                role: 'user'
              })
            })
          } else res.status(401).send({ msg: "Password is incorrect" })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch(() => {
      Admin.findOne({ username })
        .then((admin) => {
          bcrypt.compare(password, admin.password)
            .then((isPasswordCorrect) => {
              if (isPasswordCorrect) {
                const payload = { id: admin.id, name: admin.firstName, role: 'admin' }
                jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
                  if (err) return res.json({ msg: err })
                  return res.json({
                    accessToken: token,
                    role: 'admin',
                    name: admin.firstName
                  })
                })
              } else res.status(401).send({ msg: "Password is incorrect" })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(() => {
          res.status(404).send({ msg: "Username not found" })
        })
    })
});

//------------------------------------------------------------------------------------------
async function rand() {
  const rand = translator.generate().substring(0, 5);
  return rand;
}
app.post("/flights", async (req, res) => {
  try {
    Flight.create({
      flightNumber: req.body.flightNo,
      departureLocation: {
        country: req.body.departureCountry,
        city: req.body.departureCity,
        airport: req.body.departureAirport,
        terminal: req.body.departureTerminal,
      },
      arrivalLocation: {
        country: req.body.arrivalCountry,
        city: req.body.arrivalCity,
        airport: req.body.arrivalAirport,
        terminal: req.body.arrivalTerminal,
      },
      departureTerminal: req.body.departure,
      arrivalTerminal: req.body.arrival,
      departureTime: req.body.datedepart,
      arrivalTime: req.body.datearrive,
      economySeatsAvailable:
        req.body.economyseats === null ? 0 : req.body.economyseats,
      businessSeatsAvailable:
        req.body.businessseats === null ? 0 : req.body.businessseats,
      firstSeatsAvailable:
        req.body.firstseats === null ? 0 : req.body.firstseats,
      totalEconomySeats:
        req.body.economyseats === null ? 0 : req.body.economyseats,
      totalBusinessSeats:
        req.body.businessseats === null ? 0 : req.body.businessseats,
      totalFirstSeats: req.body.firstseats === null ? 0 : req.body.firstseats,
      firstClassPrice: req.body.firstprice,
      businessClassPrice: req.body.businessprice,
      economyClassPrice: req.body.economyprice,
    });
    alert("Flight Successfully Created!");
  } catch (error) {
    console.log(error);
  }
  res.redirect("http://localhost:3000/admin");
});

/*app.get("/register", async (req, res) => {
  if (repeated) {
    res.send("repeated");
    repeated = false;
  }
});*/
app.post("/checkemail", async (req, res) => {
  let bool = false;
  //console.log(req.body.email);
  if (req.body.email != undefined) {
    let user = await User.findOne({ email: req.body.email });
    if (user != null) {
      // repeated = true;
      //console.log(user);
      bool = true;
      // repeated = false;
    }
  }
  res.send(bool);
});

app.post("/checkusername", async (req, res) => {
  let bool = false;
  //console.log(req.body.username);
  if (req.body.username != undefined) {
    let user = await User.findOne({ username: req.body.username });
    if (user != null) {
      // repeated = true;
      console.log(user);
      bool = true;
      // repeated = false;
    }
  }
  res.send(bool);
});
app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(hash);
    User.create({
      username: req.body.username,
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      password: hash,
      passportNumber: req.body.passportnumber,
      phoneNumber: req.body.phonenumber,
      homeAddress: req.body.address,
      countryCode: req.body.countrycode,
    }).then((user) => {
      const payload = { id: user._id, name: user.firstName, role: 'user' }
      jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) return res.json({ msg: err })
        return res.json({
          accessToken: token,
          name: user.firstName,
          role: 'user'
        })
      })
    })
    //res.redirect("http://localhost:3000/");
  } catch (error) {
    console.log(error);
  }
});

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

app.get("/userflights", async (req, res) => {
  console.log(req.verifiedUser)
  var user = await User.find({});
  user = await user[0].populate("reservations");
  var reservations = user.reservations;
  for (let i = 0; i < reservations.length; i++) {
    await reservations[i].populate("inBoundflight");
    await reservations[i].inBoundflight.populate("reservations");
    await reservations[i].populate("outBoundflight");
    await reservations[i].outBoundflight.populate("reservations");
    await reservations[i].populate("user");
  }
  res.json(reservations);
});

/*app.get('/summary', async (req,res) =>{
  var inBoundflight = await Reservation.findOne({outBoundClass: "Economy"}).populate('inBoundflight');
  var outBoundFlight = await Reservation.findOne({outBoundClass: "Economy"}).populate('outBoundflight');
  console.log(allData.inBoundflight.departureTime);
});*/

app.delete("/flight/:flightId/delete", verifyAdmin, async (req, res) => {
  var id = mongoose.Types.ObjectId(req.params.flightId);
  try {
    await Flight.findByIdAndDelete(id);
    res.send("Flight Deleted");
  } catch (error) {
    console.log(error);
  }
});

app.post("/reservationinsertion", async (req, res) => {
  var mongooseID = new mongoose.Types.ObjectId();
  Reservation.create({
    _id: mongooseID,
    user: "61a762c24c337dff67c229fe",
    outBoundflight: req.body.previousStage.depchosenflight._id,
    inBoundflight: req.body.previousStage.returnchosenflight._id,
    outBoundClass: req.body.outBoundClass,
    inBoundClass: req.body.inBoundClass,
    passengers: req.body.passengers,
    confirmationNumber: req.body.confirmationNumber,
    totalPrice: req.body.totalPrice,
  });
  await User.findByIdAndUpdate(
    new mongoose.Types.ObjectId("61a762c24c337dff67c229fe"),
    { $push: { reservations: mongooseID } },
    { new: true }
  );
  if (req.body.outBoundClass === "Economy")
    var y = await Flight.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.body.previousStage.depchosenflight._id),
      {
        $push: { reservations: mongooseID },
        economySeatsAvailable:
          req.body.previousStage.depchosenflight.economySeatsAvailable -
          req.body.passengers.length,
      },
      { new: true }
    );
  else if (req.body.outBoundClass === "First")
    var y = await Flight.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.body.previousStage.depchosenflight._id),
      {
        $push: { reservations: mongooseID },
        firstSeatsAvailable:
          req.body.previousStage.depchosenflight.firstSeatsAvailable -
          req.body.passengers.length,
      },
      { new: true }
    );
  else if (req.body.outBoundClass === "Business")
    var y = await Flight.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.body.previousStage.depchosenflight._id),
      {
        $push: { reservations: mongooseID },
        businessSeatsAvailable:
          req.body.previousStage.depchosenflight.businessSeatsAvailable -
          req.body.passengers.length,
      },
      { new: true }
    );

  if (req.body.inBoundClass === "Economy")
    var y = await Flight.findByIdAndUpdate(
      new mongoose.Types.ObjectId(
        req.body.previousStage.returnchosenflight._id
      ),
      {
        $push: { reservations: mongooseID },
        economySeatsAvailable:
          req.body.previousStage.returnchosenflight.economySeatsAvailable -
          req.body.passengers.length,
      },
      { new: true }
    );
  else if (req.body.inBoundClass === "First")
    var y = await Flight.findByIdAndUpdate(
      new mongoose.Types.ObjectId(
        req.body.previousStage.returnchosenflight._id
      ),
      {
        $push: { reservations: mongooseID },
        firstSeatsAvailable:
          req.body.previousStage.returnchosenflight.firstSeatsAvailable -
          req.body.passengers.length,
      },
      { new: true }
    );
  else if (req.body.inBoundClass === "Business")
    var y = await Flight.findByIdAndUpdate(
      new mongoose.Types.ObjectId(
        req.body.previousStage.returnchosenflight._id
      ),
      {
        $push: { reservations: mongooseID },
        businessSeatsAvailable:
          req.body.previousStage.returnchosenflight.businessSeatsAvailable -
          req.body.passengers.length,
      },
      { new: true }
    );
});
app.put("/flights/:flightId", verifyAdmin, async (req, res) => {
  const updateData = req.body;
  delete updateData._id;

  const searchId = mongoose.Types.ObjectId(req.params.flightId);

  try {
    const doc = await Flight.findByIdAndUpdate(searchId, updateData, {
      new: true,
    });
    res.send(doc);
  } catch (error) {
    console.log(error);
  }
});

app.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.send(flights);
  } catch (error) {
    res.send([]);
  }
});

app.get("/flights/:flightId", verifyAdmin, async (req, res) => {
  try {
    let flight = await Flight.findById(req.params.flightId).exec();
    res.send(flight);
  } catch (error) {
    console.log(error);
  }
});

//edit reservation

app.put("/changeseats", async (req, res) => {
  var id = mongoose.Types.ObjectId(req.body.newReservation._id);
  newReservation = req.body.newReservation;

  newReservation.user = "61a762c24c337dff67c229fe",

    await Reservation.findByIdAndUpdate(id, { passengers: newReservation.passengers })
});

//------------------reservations delete--------
app.delete("/reservations/:reservationId", (req, res) => {
  try {
    if (!req.params.reservationId)
      res.status(400).send({ message: "Reservation Id invalid" });
    const reservationId = mongoose.Types.ObjectId(req.params.reservationId);
    Reservation.findByIdAndDelete(reservationId).then((reservationDeleted) => {
      if (!reservationDeleted)
        res.status(404).send({ message: "Couldn't find reservation" });
      User.findByIdAndUpdate(
        reservationDeleted.user,
        { $pull: { reservations: reservationId } },
        { new: true }
      ).then((userFound) => {
        let outBoundSeatsToBeIncremented = "";
        switch (reservationDeleted.outBoundClass) {
          case "First":
            outBoundSeatsToBeIncremented = "firstSeatsAvailable";
            break;
          case "Business":
            outBoundSeatsToBeIncremented = "businessSeatsAvailable";
            break;
          case "Economy":
            outBoundSeatsToBeIncremented = "economySeatsAvailable";
            break;
          default:
        }
        Flight.findByIdAndUpdate(
          reservationDeleted.outBoundflight._id,
          {
            $pull: { reservations: reservationId },
            $inc: {
              [outBoundSeatsToBeIncremented]:
                reservationDeleted.passengers.length,
            },
          },
          { new: true }
        ).then((outBoundFlight) => {
          let inBoundSeatsToBeIncremented = "";
          switch (reservationDeleted.inBoundClass) {
            case "First":
              inBoundSeatsToBeIncremented = "firstSeatsAvailable";
              break;
            case "Business":
              inBoundSeatsToBeIncremented = "businessSeatsAvailable";
              break;
            case "Economy":
              inBoundSeatsToBeIncremented = "economySeatsAvailable";
              break;
            default:
          }
          Flight.findByIdAndUpdate(
            reservationDeleted.inBoundflight._id,
            {
              $pull: { reservations: reservationId },
              $inc: {
                [inBoundSeatsToBeIncremented]:
                  reservationDeleted.passengers.length,
              },
            },
            { new: true }
          ).then((inBoundFlight) => {
            let outBoundPrice = 0;
            let inBoundPrice = 0;
            switch (reservationDeleted.outBoundClass) {
              case "First":
                outBoundPrice = outBoundFlight.firstClassPrice;
                break;
              case "Business":
                outBoundPrice = outBoundFlight.businessClassPrice;
                break;
              case "Economy":
                outBoundPrice = outBoundFlight.economyClassPrice;
                break;
              default:
            }

            switch (reservationDeleted.inBoundClass) {
              case "First":
                inBoundPrice = inBoundFlight.firstClassPrice;
                break;
              case "Business":
                inBoundPrice = inBoundFlight.businessClassPrice;
                break;
              case "Economy":
                inBoundPrice = inBoundFlight.economyClassPrice;
                break;
              default:
            }
            outBoundPrice *= reservationDeleted.passengers.length;
            inBoundPrice *= reservationDeleted.passengers.length;

            let mailOptions = {
              from: `'Takeoff Airways' <${process.env.MAIL_USER}>`,
              to: userFound.email,
              subject: "Refund Confirmation",
              html: `<h2 style="color:#09827C;">Hello ${userFound.firstName
                }!</h2>
                    <h4>This mail is to confirm your refund</h4>
                    <p>Outbound flight total price: <b>$${outBoundPrice}</b></p>
                    <p>Inbound flight total price: <b>$${inBoundPrice}</b></p>
                    <h3>Total Price: $${outBoundPrice + inBoundPrice}</h3>
                    <p>Have a nice day!</p>`
            }

            transporter.sendMail(mailOptions, (err, data) => {
              if (err) {
                // Reservation.create(reservationDeleted).then(() => {
                //   User.findByIdAndUpdate(reservationDeleted.user, { $push: { reservations: reservationId } })
                //     .then(() => {
                //       Flight.findByIdAndUpdate(reservationDeleted.outBoundflight, { $push: { reservations: reservationId } })
                //         .then(() => {
                //           Flight.findByIdAndUpdate(reservationDeleted.inBoundflight, { $push: { reservations: reservationId } })
                res.status(400).send(err)
                //         })
                //     })
                // })
              }
              else
                res.send(`Email Sent: ${data}`)
            })
          })
        })
      })
    })
  } catch (error) {
    res.send(error);
  }
});
//----------------
app.post("/emailreservation", async (req, res) => {
  const { reservation } = req.body;
  const userId = req.verifiedUser.id;
  const userFound = await User.findById(userId);
  let outBoundPrice = 0;
  let inBoundPrice = 0;
  switch (reservation.outBoundClass) {
    case "First":
      outBoundPrice = reservation.outBoundflight.firstClassPrice;
      break;
    case "Business":
      outBoundPrice = reservation.outBoundFlight.businessClassPrice;
      break;
    case "Economy":
      outBoundPrice = reservation.outBoundFlight.economyClassPrice;
      break;
    default:
  }

  switch (reservation.inBoundClass) {
    case "First":
      inBoundPrice = reservation.inBoundFlight.firstClassPrice;
      break;
    case "Business":
      inBoundPrice = reservation.inBoundFlight.businessClassPrice;
      break;
    case "Economy":
      inBoundPrice = reservation.inBoundFlight.economyClassPrice;
      break;
    default:
  }
  outBoundPrice *= reservation.passengers.length;
  inBoundPrice *= reservation.passengers.length;
  let mailOptions = {
    from: `'Takeoff Airways' <${process.env.MAIL_USER}>`,
    to: userFound.email,
    subject: "Itinerary Email",
    html: `<h2 style="color:#09827C;">Hello ${userFound.firstName
      }!</h2>
          <h3>This mail is for the iteinerary you requested </h3>
          <h4>The Departure flight details</h4>
          <p>Flight Number: <b>${reservation.outBoundFlight.flightNumber}</b></p>
          <p>From: <b>${reservation.outBoundFlight.departureLocation.airport}</b></p>
          <p>To: <b>${reservation.outBoundFlight.arrivalLocation.airport}</b></p>
          <p>Departure Time: <b>${new Date(reservation.outBoundFlight.departureTime).toLocaleString()}</b></p>
          <p>Arrival Time: <b>${new Date(reservation.outBoundFlight.arrivalTime).toLocaleString()}</b></p>
          <p>Outbound flight total price: <b>$${outBoundPrice}</b></p>
          <h4>The Return flight details</h4>
          <p>Flight Number: <b>${reservation.inBoundFlight.flightNumber}</b></p>
          <p>From: <b>${reservation.inBoundFlight.departureLocation.airport}</b></p>
          <p>To: <b>${reservation.inBoundFlight.arrivalLocation.airport}</b></p>
          <p>Departure Time: <b>${new Date(reservation.inBoundFlight.departureTime).toLocaleString()}</b></p>
          <p>Arrival Time: <b>${new Date(reservation.inBoundFlight.arrivalTime).toLocaleString()}</b></p>
          <p>Inbound flight total price: <b>$${inBoundPrice}</b></p>
          <h3>Total Price: $${outBoundPrice + inBoundPrice}</h3>
          <p>Have a nice day!</p>`
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    else
      res.send(`Email Sent: ${data}`)
  })

})
//----------------get and post user data----------------
app.get("/user", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.verifiedUser.id);

  User.findById(userId).then((data) => {
    res.send(data);
  });
});

app.put("/user", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.verifiedUser.id);
  const userData = req.body;
  delete userData._id;

  User.findByIdAndUpdate(userId, userData, { new: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
//--------------------------------------------------------------

app.post("/flights/flightquery", async (req, res) => {
  try {
    let body = req.body;
    let outward = req.body.out;
    let inward = req.body.in;

    let outDepDate = outward.dep;
    let inDepDate = inward.dep;
    let outClass = outward.class;
    let inClass = inward.class;

    let rawOutData = {
      "departureLocation.airport": body.from,
      "arrivalLocation.airport": body.to,
    };
    let rawInData = {
      "departureLocation.airport": body.to,
      "arrivalLocation.airport": body.from,
    };

    let outFlights = await Flight.find(rawOutData).populate("reservations");
    let inFlights = await Flight.find(rawInData).populate("reservations");

    let queryOutDate = new Date(outDepDate);
    let queryInDate = new Date(inDepDate);

    let noOutFlights = false;
    let noInFlights = false;

    queryOutDate.setTime(queryOutDate.getTime() + 2 * 60 * 60 * 1000);
    queryInDate.setTime(queryInDate.getTime() + 2 * 60 * 60 * 1000);


    outDates = [];
    inDates = [];
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
      } else {
        let passengers = parseInt(body.kids) + parseInt(body.adults);
        switch (outClass) {
          case "economy":
            return flight.economySeatsAvailable >= passengers;
            break;
          case "business":
            return flight.businessSeatsAvailable >= passengers;
            break;
          case "first":
            return flight.firstSeatsAvailable >= passengers;
            break;
          default:
            return false;
        }
      }
    });

    let filteredInFlights = inFlights.filter((flight) => {
      queryInDate.setHours(0, 0, 0, 0);
      let flightDate = new Date(flight.arrivalTime);
      flightDate.setHours(0, 0, 0, 0);
      let difference = Math.abs(queryInDate - flightDate);
      difference = difference / 1000 / 60 / 60 / 24;
      if (difference > 7) {
        return false;
      } else {
        let passengers = parseInt(body.kids) + parseInt(body.adults);
        switch (inClass) {
          case "economy":
            return flight.economySeatsAvailable >= passengers;
            break;
          case "business":
            return flight.businessSeatsAvailable >= passengers;
            break;
          case "first":
            return flight.firstSeatsAvailable >= passengers;
            break;
          default:
            return false;
        }
      }
    });

    // for every date in outDates, check if there is a flight with the same date in filteredOutFlights

    // console.log(filteredOutFlights[0]);

    if (filteredOutFlights.length == 0) {
      noOutFlights = true;
    }
    if (filteredInFlights.length == 0) {
      noInFlights = true;
    }

    let outFlightsWithDate = [];
    for (let i = 0; i < outDates.length; i++) {
      let tempDate = new Date(outDates[i]);
      let tempDateString = tempDate.toISOString().substring(0, 10);
      let tempFlights = filteredOutFlights.filter((flight) => {
        let flightDate = new Date(flight.departureTime);
        let flightDateString = flightDate.toISOString().substring(0, 10);
        // console.log( "tempDate" , tempDateString)
        // console.log( "flightDate" , flightDateString)
        return flightDateString === tempDateString;
      });

      let datstateect = {};
      datstateect[tempDateString] = tempFlights;
      outFlightsWithDate.push({ date: tempDate, flights: tempFlights });
    }

    let inFlightsWithDate = [];
    for (let i = 0; i < inDates.length; i++) {
      let tempDate = new Date(inDates[i]);
      let tempDateString = tempDate.toISOString().substring(0, 10);
      let tempFlights = filteredInFlights.filter((flight) => {
        let flightDate = new Date(flight.departureTime);
        let flightDateString = flightDate.toISOString().substring(0, 10);
        // console.log( "tempDate" , tempDateString)
        // console.log( "flightDate" , flightDateString)
        return flightDateString === tempDateString;
      });

      let datstateect = {};
      datstateect[tempDateString] = tempFlights;
      inFlightsWithDate.push({ date: tempDate, flights: tempFlights });
    }

    res.status(200).send({
      depOriginalFlights: outFlightsWithDate,
      depAllFlights: outFlightsWithDate,
      depsearchdate: new Date(outDepDate),
      from: body.from,
      to: body.to,
      depfaded: true,
      depchosenFlight: null,
      returnOriginalFlights: inFlightsWithDate,
      returnAllflights: inFlightsWithDate,
      returnsearchdate: new Date(inDepDate),
      returnchosenflight: null,
      returnfaded: true,
      numberOfpassengers: parseInt(body.kids) + parseInt(body.adults),
      noOutFlights: noOutFlights,
      noInFlights: noInFlights,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(null);
  }
});



///////////////////// Stripe ////////////////////////



const createCustomer = async (email) => {
  const customer = await stripe.customers.create({
    email: email,

  }

  );

  console.log(customer);
}


const retrieveCustomer = async (email) => {

  const customers = await stripe.customers.list({
    email: email
  });

  return customers.data;
}


const updateCustomer = async (id, params) => {

  const customer = await stripe.customers.update(
    id, params
  );

}

const createFlightProduct = async (params) => {
  const product = await stripe.products.create({
    name: params.from + "-" + params.to,
    metadata: { "Flight_Number": params.id, "class": params.class, "depTime": params.depDate, "arrTime": params.arrDate }
  });
  console.log(product)
  return product
}


const getFlightProduct = async (id) => {
  const products = await stripe.products.list();
  let filteredProducts = products.data.filter(flight => {
    if (flight.metadata.Flight_Number == id) {
      return flight
    }

  })
  return filteredProducts;

}

const createPrice = async (p, pid) => {
  const price = await stripe.prices.create({
    unit_amount: p * 100,
    currency: 'usd',
    product: pid
  });

  return price;
}


const createFlightProducts = async (flight) => {

  const from = flight[0].departureLocation.airport;
  const to = flight[0].arrivalLocation.airport;
  const id = flight[0].flightNumber;
  const ecoPrice = flight[0].economyClassPrice;
  const busPrice = flight[0].businessClassPrice;
  const firstPrice = flight[0].firstClassPrice;
  let depDate = flight[0].departureTime;
  let arrDate = flight[0].arrivalTime;
  // parse date to string
  depDate = new Date(depDate);
  arrDate = new Date(arrDate);
  depDate = depDate.toISOString().substring(0, 10);
  arrDate = arrDate.toISOString().substring(0, 10);


  const productEco = await createFlightProduct({ 'from': from, 'to': to, 'id': id, 'class': 'Economy', 'depTime': depDate, 'arrTime': arrDate })
  const productBus = await createFlightProduct({ 'from': from, 'to': to, 'id': id, 'class': 'Business', 'depTime': depDate, 'arrTime': arrDate })
  const productFirst = await createFlightProduct({ 'from': from, 'to': to, 'id': id, 'class': 'First', 'depTime': depDate, 'arrTime': arrDate })

  console.log('Eco : ' + productEco.id)


  const priceEco = await createPrice(ecoPrice, productEco.id)
  const priceBus = await createPrice(busPrice, productBus.id)
  const priceFirst = await createPrice(firstPrice, productFirst.id)

  console.log('Eco Price : ' + priceEco)
  return [productEco, productBus, productFirst, priceEco, priceBus, priceFirst]

}




app.post("/create-checkout-session", async (req, res) => {

  const state = req.body.state;

  const dep = {
    "depDate": state.previousStage.depchosenflight.departureTime, "arrDate": state.previousStage.depchosenflight.arrivalTime,
    "flightNum": state.previousStage.depchosenflight.flightNumber, "class": state.previousStage.depflightClass
  }

  const arr = {
    "depDate": state.previousStage.returnchosenflight.departureTime, "arrDate": state.previousStage.returnchosenflight.arrivalTime,
    "flightNum": state.previousStage.returnchosenflight.flightNumber, "class": state.previousStage.returnflightClass
  }

  const numPass = state.previousStage.numberOfpassengers;

  // const email = req.body.email;

  let depDate1 = dep.depDate;
  let arrDate1 = dep.arrDate;
  let depDate2 = arr.depDate;
  let arrDate2 = arr.arrDate;


  depDate1 = new Date(depDate1);
  arrDate1 = new Date(arrDate1);
  depDate2 = new Date(depDate2);
  arrDate2 = new Date(arrDate2);
  depDate1 = depDate1.toISOString().substring(0, 10);
  arrDate1 = arrDate1.toISOString().substring(0, 10);
  depDate2 = depDate2.toISOString().substring(0, 10);
  arrDate2 = arrDate2.toISOString().substring(0, 10);

  // dep = { flightNum , cls , numPass , depDate , arrDate }

  console.log(dep.flightNum);


  let depFlight = await Flight.find({ flightNumber: dep.flightNum })
  let arrFlight = await Flight.find({ flightNumber: arr.flightNum })

  // check if email exists if not create customer
  // let customer = await retrieveCustomer(email)
  // if (customer.length === 0) {
  //   customer = await createCustomer(email);
  // }
  // else {
  //   customer = customer[0]
  // }

  console.log(depFlight[0].economyFlightProductId === null);

  // check if both flights exist by flight id if not create 3 flights products for each class



  let depFlightProduct = null
  let arrFlightProduct = null
  let depPrice = null
  let arrPrice = null


  if (depFlight[0].economyFlightProductId === null) {
    // create products and return their IDs ; we need them to create the session line items
    // update in the DB the 3 ids of the 3 classes
    let depProducts = await createFlightProducts(depFlight)
    // console.log(depProducts);
    depBusinessProductId = depProducts[1].id
    depEconomyProductId = depProducts[0].id
    depFirstProductId = depProducts[2].id
    depEconomyPriceId = depProducts[3].id
    depBusinessPriceId = depProducts[4].id
    depFirstPriceId = depProducts[5].id

    // update flight id
    await Flight.updateOne({ flightNumber: dep.flightNum }, { $set: { economyFlightProductId: depEconomyProductId, businessFlightProductId: depBusinessProductId, firstFlightProductId: depFirstProductId, economyFlightPriceId: depEconomyPriceId, businessFlightPriceId: depBusinessPriceId, firstFlightPriceId: depFirstPriceId } })

    switch (dep.class) {
      case 'Economy': depFlightProduct = depEconomyProductId; depPrice = depEconomyPriceId; break;
      case 'Business': depFlightProduct = depBusinessProductId; depPrice = depBusinessPriceId; break;
      case 'First': depFlightProduct = depFirstProductId; depPrice = depFirstPriceId; break;
    }

  }
  else {
    console.log(depFlight[0].economyFlightPriceId);
    console.log("here")
    switch (dep.class) {
      case 'Economy': depFlightProduct = depFlight[0].economyFlightProductId; depPrice = depFlight[0].economyFlightPriceId; break;
      case 'Business': depFlightProduct = depFlight[0].businessFlightProductId; depPrice = depFlight[0].businessFlightPriceId; break;
      case 'First': depFlightProduct = depFlight[0].firstFlightProductId; depPrice = depFlight[0].firstFlightPriceId; break;
    }
  }

  if (arrFlight[0].economyFlightProductId === null) {
    // create products and return their IDs ; we need them to create the session line items
    // update in the DB the 3 ids of the 3 classes
    let arrProducts = await createFlightProducts(arrFlight)
    arrBusinessProductId = arrProducts[1].id
    arrEconomyProductId = arrProducts[0].id
    arrFirstProductId = arrProducts[2].id
    arrEconomyPriceId = arrProducts[3].id
    arrBusinessPriceId = arrProducts[4].id
    arrFirstPriceId = arrProducts[5].id

    // update flight id
    await Flight.updateOne({ flightNumber: arr.flightNum }, { $set: { economyFlightProductId: arrEconomyProductId, businessFlightProductId: arrBusinessProductId, firstFlightProductId: arrFirstProductId, economyFlightPriceId: arrEconomyPriceId, businessFlightPriceId: arrBusinessPriceId, firstFlightPriceId: arrFirstPriceId } })
    switch (arr.class) {
      case 'Economy': arrFlightProduct = arrEconomyProductId; arrPrice = arrEconomyPriceId; break;
      case 'Business': arrFlightProduct = arrBusinessProductId; arrPrice = arrBusinessPriceId; break;
      case 'First': arrFlightProduct = arrFirstProductId; arrPrice = arrFirstPriceId; break;

    }
  }
  else {
    console.log(arrFlight[0].economyFlightPriceId);
    switch (arr.class) {
      case 'Economy': arrFlightProduct = arrFlight[0].economyFlightProductId; arrPrice = arrFlight[0].economyFlightPriceId; break;
      case 'Business': arrFlightProduct = arrFlight[0].businessFlightProductId; arrPrice = arrFlight[0].businessFlightPriceId; break;
      case 'First': arrFlightProduct = arrFlight[0].firstFlightProductId; arrPrice = arrFlight[0].firstFlightPriceId; break;
    }
  }



  // console.log(customer.id)
  // console.log(numPass)
  console.log(depPrice)
  console.log(arrPrice)
  // console.log(arrFlightProduct)



  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: depPrice,
        quantity: numPass,
        description: "Flight Number: " + dep.flightNum + ' ' + '- Class: ' + dep.class + ' - ' + 'Departure Time : ' + dep.depDate1 + ' - ' + 'Arrival Time :' + dep.arrDate1,
      },
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: arrPrice,
        quantity: numPass,
        description: "Flight Number: " + arr.flightNum + ' ' + '- Class: ' + arr.class + ' - ' + 'Departure Time : ' + arr.depDate2 + ' - ' + 'Arrival Time :' + arr.arrDate2,

      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/payment?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/seatselector',
  });

  console.log(session);
  res.send(session);

});


const createRefund = async (pid, refundAmount) => {
  const refund = await stripe.refunds.create({
    payment_intent: pid,
    amount: refundAmount * 100
  });
  return refund;
}


app.post("/refund", async (req, res) => {
  try {
    const refund = await createRefund(req.body.pid, req.body.amount);
    console.log(refund)
    res.send(refund);
  }
  catch (err) {
    console.log(err)
    res.status(400).send({})
  }



});





app.post('/change-flight-payment', async (req, res) => {

  // get old flight dep and arr
  // get new flight dep and arr
  // get old flight total price
  // get new flight total price
  // if new > old redirect to payment session
  // else refund

  const body = req.body;
  const flightName = body.name;
  const amount = body.amount;
  const numPass = body.numPass;
  const pid = 'prod_KpJJhW42ynbZ8i'
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: numPass,
        price_data: {
          currency: 'usd',
          unit_amount: amount * 100,
          product: pid

        },
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.send(session);
});










// stripe.prices.retrieve(
//   'price_1K9egRGx4Kq2M7uIIBfNHlJ6'
// ).then( price => { console.log(price) } )


// Flight.find({ flightNumber: 'AMORY' }).then(flight => {console.log(flight)})



// app.post('/flights/create-checkout-session', async (req, res) => {
// const session = await stripe.checkout.sessions.create({
//   line_items: [
//     {
//       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//       price: 'price_1K9egRGx4Kq2M7uIIBfNHlJ6',
//       quantity: 1,
//     },
//   ],
//   mode: 'payment',
//   success_url: 'http://localhost:3000/payment',
//     cancel_url: 'http://localhost:3000/seatselector',
// });

//   res.send(session);
// });



// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
