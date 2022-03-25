
# Take Off Airlines Web Application Documentation

This is a web application built as a project for the Advanced Computer Lab Course CSEN704.

[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)]()
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)]()

### :gem: Team Members :gem:

[![Ahmed ElAmory](https://img.shields.io/static/v1?label=Ahmed+ElAmory&message=+&color=grey&logo=github)
](https://github.com/ahmedelamory)

[![Ahmed Belal](https://img.shields.io/static/v1?label=Ahmed+Belal&message=+&color=grey&logo=github)
](https://github.com/Ahmed-Belal1)

[![Omar Elsawi](https://img.shields.io/static/v1?label=Omar+Elsawi&message=+&color=grey&logo=github)
](https://github.com/omarelsawi)

[![Mohamed Amr](https://img.shields.io/static/v1?label=Mohamed+Amr&message=+&color=grey&logo=github)
](https://github.com/mohamedamr13)

[![Ahmed Tamer](https://img.shields.io/static/v1?label=Ahmed+Tamer&message=+&color=grey&logo=github)
](https://github.com/Ahmed-Tamer1)



### Motivation

The project was built for a university project. We were asked to develop an airline reservation system. We chose Take Off as our website name and we developed both the frontend and backend of the web application.

### Build Status

[![works badge](https://cdn.jsdelivr.net/gh/nikku/works-on-my-machine@v0.2.0/badge.svg)]()

### Code Style

The React part of the code (front end) uses class components most of the time. Functional components were used sometimes to be able to use react router and pass props from component to another.

### Screenshots

As the saying goes, a picture is equal to a thousand words. Most people will be interested if there is a visual representation of what the project is about. It helps them understand better. A visual representation can be snapshots of the project or a video of the functioning of the project.

![This is an image](https://img1.wsimg.com/isteam/ip/6a667436-808e-49ad-94f3-a350d6117ad4/landingPageDesktop.png/:/rs=w:1280)
![This is an image](https://img1.wsimg.com/isteam/ip/6a667436-808e-49ad-94f3-a350d6117ad4/landingPageMobile2.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280)




### Tech/Framework used

**BackEnd:**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


**FrontEnd:**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)

### Features
- Admin Features:

-- Create, update and delete flights.

- Guest Features:

-- Search for available flights and view them.

- Registered User Features:

-- Search for available flights and view them.

--Make, update and cancel reservations.

--View all his reservations.

--Edit his account information.


### Code Examples

**Frontend component example:**

    import axios from 'axios';
    import React, { Component } from 'react';
    import GuestNavBar from './GuestNavBar';
    import AdminNavBar from './AdminNavBar';
    import UserNavBar from './UserNavBar';

    class NavBarSelector extends Component {
        state = {
            show: 'guest'
        }

        componentDidMount() {
            axios.get('http://localhost:8000/checkAuth')
                .then(() => {
                    axios.get('http://localhost:8000/checkAdmin')
                        .then(() => {
                            this.setState({ show: 'admin' })
                        })
                        .catch(() => {
                            this.setState({ show: 'user' })
                        })
                })
                .catch(() => {
                    this.setState({ show: 'guest' })
                })
        }
        render() {
            const { show } = this.state
            if (show === 'admin')
                return <AdminNavBar />
            if (show === 'user')
                return <UserNavBar />
            if (show === 'guest')
                return <GuestNavBar />
        }
    }

    export default NavBarSelector;

**Backend API request example:**

    app.delete("/flight/:flightId/delete", verifyAdmin, async (req, res) => {
      var id = mongoose.Types.ObjectId(req.params.flightId);
      try {
        await Flight.findByIdAndDelete(id);
        res.send("Flight Deleted");
      } catch (error) {
        console.log(error);
      }
    });


### Installation
1. Clone the Repository
2. Navigate to the backend folder and run ``npm install`` to install the backend dependencies.
3. Run ``npm start`` to start the backend side of the web application
4. Navigate to the frontend folder and run ``npm install`` to install the frontend dependencies.
5. Run ``npm start`` to start the frontend of the web application.
6. Go to http://localhost:3000/ and the website will be running!

### API reference

### DELETE /flight/:flightId/delete

deletes a flight

flightId is the if for the deleted flight

response sample:
```
"Flight Deleted"
```
### PUT /changeseats

request sample:
```
{
  newReservation: {
    _id: '61c7811b8ca890dc40b62e48',
    outBoundflight: '61a5a12c30240908791077f4',
    inBoundflight: '61a5a12b30240908791077e2',
    outBoundClass: 'Economy',
    inBoundClass: 'First',
    passengers: [ [Object] ],
    totalPrice: 4969
  }
}
```

### POST /reservation
request sample
```
"[{"firstName":"Mohamed Amr","lastName":"Mohamed ","passportNumber":"A1133","outBoundSeat":"N/A","inBoundSeat":"N/A"}]"

```

response sample
```
 { "confirmNum" : ""77217247882"" }
```

### POST /flight
request sample
```
 { "flightNumber" : "AMORY" }
```

### POST /refund
request sample
```
{ "confirmNum" : "77217247882" , "amount" : "100" }
```

### POST /change-flight-payment
request sample
```
  chosenFlight : this.props.details.chosenFlight,
    priceDifference : this.props.details.priceDifference,
    direction : this.props.details.direction,
    newReservation : {
      _id:this.props.details.reservation._id,
      outBoundflight: {},
      inBoundflight: {},
      outBoundClass: {},
      inBoundClass: {},
      passengers: {},
      confirmationNumber: {},
      totalPrice: {}
```


### POST /flights/flightquery
request sample:
```
"out": { "dep": depDate, "class": classes[depClass] },
"in": { "dep": arrDate, "class": classes[arrClass] },
"from": from, "to": to, "adults": adults, "kids": kids }
```
response sample:
```
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
```


### POST /create-checkout-session
request sample
```
{ "state" :{
  "selectedSeats": [],
  "outBoundRows": [ ],
  "inBoundRows": [],
  "departureCity": "ANTANANARIVO",
  "arrivalCity": "LANZAROTE",
  "passengers": [
    {
      "firstName": "Mohamed Amr",
      "lastName": "Mohamed ",
      "passportNumber": "A1133",
      "outBoundSeat": "N/A",
      "inBoundSeat": "N/A"
    }
  ],
  "activeFlight": 0,
  "activePassenger": 0,
  "outBoundClass": "Economy",
  "inBoundClass": "Economy",
  "previousStage": {},
  "confirmationNumber": 11126766983
} }
```

### POST /flights

response sample:
```
"Flight Successfully Created!"
```
### POST /reservationinsertion

Inserts a new reservation and prints out the reservation's details.

response sample:
```
 _id: '61c7811b8ca890dc40b62e48',
    outBoundflight: '61a5a12c30240908791077f4',
    inBoundflight: '61a5a12b30240908791077e2',
    outBoundClass: 'Economy',
    inBoundClass: 'First',
    passengers: [ [Object] ],
    totalPrice: 4969
   ```

### POST /checkemail

Checks whether the email inserted by the user already exists in the database.

response sample:
```
true
```

### POST /checkusername

Checks whether the username inserted by the user already exists in the database.

response sample:
```
false
```

### POST /register

Registers a new user with the information filled in by a guest user + an encrypted password.

response sample:
```
 _id: new ObjectId("61c3b4db361aa61777530613"),
  username: 'test',
  email: 'test@test.com',
  password: '$2b$10$D48Wu9LwMETrDWGi4LrVWufW8ESCEGDTzRDBIu3kFeunPbAEMbQ4q',
  firstName: 'test',
  lastName: 'test',
  homeAddress: 'test',
  countryCode: 'test',
  phoneNumber: 'test',
  passportNumber: 'test',
  reservations: [],
  __v: 0
}
```
### GET /userflights

Gets all reserved flights for the currently logged in user, populates the fields and sends all the info in JSON format to the frontend to
be displayed.

```
[
  {
    _id: new ObjectId("61c7811b8ca890dc40b62e48"),
    user: {
      _id: new ObjectId("61c4a281c03da56f546884cb"),
      username: 'auth',
      email: 'ahmed.belal.dawood@gmail.com',
      password: '$2b$10$uHr5zn2FKBHgn9dooMOrEOAexv.RBQl77I/DZGul8Nl4qlU7lUQVa',
      firstName: 'auth',
      lastName: 'shouldwork',
      homeAddress: 'auth',
      countryCode: 'auth',
      phoneNumber: '111111111',
      passportNumber: 'auth',
      reservations: [Array],
      __v: 0
    },
    outBoundflight: {
      departureLocation: [Object],
      arrivalLocation: [Object],
      economyFlightProductId: null,
      businessFlightProductId: null,
      firstFlightProductId: null,
      economyFlightPriceId: null,
      businessFlightPriceId: null,
      firstFlightPriceId: null,
      _id: new ObjectId("61a5a12c30240908791077f4"),
      economySeatsAvailable: 102,
      businessSeatsAvailable: 15,
      firstSeatsAvailable: 12,
      totalEconomySeats: 30,
      totalBusinessSeats: 20,
      totalFirstSeats: 10,
      reservations: [Array],
      firstClassPrice: 3615,
      businessClassPrice: 772,
      economyClassPrice: 72,
      flightNumber: '3kMuMW',
      departureTime: 2022-02-09T11:34:11.999Z,
      arrivalTime: 2022-02-09T20:34:11.999Z,
      __v: 0
    },
    inBoundflight: {
      departureLocation: [Object],
      arrivalLocation: [Object],
      _id: new ObjectId("61a5a12b30240908791077e2"),
      economySeatsAvailable: 2,
      businessSeatsAvailable: 4,
      firstSeatsAvailable: 7,
      totalEconomySeats: 30,
      totalBusinessSeats: 20,
      totalFirstSeats: 10,
      reservations: [Array],
      firstClassPrice: 4897,
      businessClassPrice: 1390,
      economyClassPrice: 32,
      flightNumber: '3DdvVv',
      departureTime: 2022-02-16T18:25:22.999Z,
      arrivalTime: 2022-02-17T03:25:22.999Z,
      __v: 0,
      businessFlightPriceId: 'price_1KAHt0Gx4Kq2M7uI3iquUCsu',
      businessFlightProductId: 'prod_KpxoSrOofL8rs1',
      economyFlightProductId: 'prod_KpxoWr2qLShqcn',
      firstFlightPriceId: 'price_1KAHt1Gx4Kq2M7uIOhnogLS9',
      firstFlightProductId: 'prod_Kpxo3Ckih9NGqF',
      economyFlightPriceId: 'price_1KAHt0Gx4Kq2M7uIP7hXMqJ8'
    },
    outBoundClass: 'First',
    inBoundClass: 'Economy',
    passengers: [ [Object] ],
    confirmationNumber: 24810854124,
    totalPrice: 3647,
    paymentNumber: 'pi_3KAgz1Gx4Kq2M7uI05cHsNEQ',
    __v: 0
  }
]

```

### GET /flights

response sample
```
[
  {
    departureLocation: {
      country: 'egypt',
      city: 'cairo',
      airport: 'cairo airport',
      terminal: '1'
    },
    arrivalLocation: {
      country: 'egypt',
      city: 'luxor',
      airport: 'luxor airport',
      terminal: '2'
    },
    economyFlightProductId: null,
    businessFlightProductId: null,
    firstFlightProductId: null,
    economyFlightPriceId: null,
    businessFlightPriceId: null,
    firstFlightPriceId: null,
    _id: new ObjectId("61c2809bf1abec0ff3f648c8"),
    flightNumber: '111',
    departureTime: 2021-12-25T01:32:27.000Z,
    arrivalTime: 2021-12-25T04:30:27.000Z,
    economySeatsAvailable: 20,
    businessSeatsAvailable: 20,
    firstSeatsAvailable: 20,
    totalEconomySeats: 20,
    totalBusinessSeats: 20,
    totalFirstSeats: 20,
    reservations: [],
    firstClassPrice: 2000,
    businessClassPrice: 1000,
    economyClassPrice: 500,
    __v: 0
  },
  {
    departureLocation: {
      country: 'egypt',
      city: 'cairo',
      airport: 'cairo airport',
      terminal: '1'
    },
    arrivalLocation: {
      country: 'egypt',
      city: 'luxor',
      airport: 'luxor airport',
      terminal: '2'
    },
    economyFlightProductId: null,
    businessFlightProductId: null,
    firstFlightProductId: null,
    economyFlightPriceId: null,
    businessFlightPriceId: null,
    firstFlightPriceId: null,
    _id: new ObjectId("61c280fbf1abec0ff3f648cc"),
    flightNumber: '222',
    departureTime: 2021-12-23T10:34:20.000Z,
    arrivalTime: 2021-12-23T13:30:20.000Z,
    economySeatsAvailable: 19,
    businessSeatsAvailable: 20,
    firstSeatsAvailable: 20,
    totalEconomySeats: 20,
    totalBusinessSeats: 20,
    totalFirstSeats: 20,
    reservations: [ new ObjectId("61c281b2f1abec0ff3f648dc") ],
    firstClassPrice: 3000,
    businessClassPrice: 2500,
    economyClassPrice: 1000,
    __v: 0
  }
]

```
### GET /checkAuth

checks if user is authenticated

response sample:
```
{
    accessToken: token,
    role: req.verifiedUser.role,
    name: req.verifiedUser.name,
}
```

### GET /checkAdmin
checks if user is an admin (authorized)

response sample:
```
{
    accessToken: token,
    role: req.verifiedUser.role,
    name: req.verifiedUser.name,
}
```

### POST /login
sends a request for logging in the user

request sample:
```
{
    username: "johndoe",
    password: "1234"
}
```

response sample:
```
{
    accessToken: token,
    name: user.firstName,
    role: "user",
}
```

### POST /changePassword
sends a request for changing password

request sample:
```
{
    newPassword: "1234",
    currentPassword: "asdf",
    currentPasswordConfirmation: "asdf"
}
```

### PUT /flights/:flightId
sends a request for editing a flight

flightId is the id for the flight

request sample:

```
{
    "departureLocation": {
        "country": "INDONESIA",
        "city": "MEDAN",
        "airport": "POLONIA",
        "terminal": "3"
    },
    "arrivalLocation": {
        "country": "MALTA",
        "city": "LUQA",
        "airport": "LUQA",
        "terminal": "1"
    },
    "economySeatsAvailable": 4,
    "businessSeatsAvailable": 4,
    "firstSeatsAvailable": 6,
    "totalEconomySeats": 30,
    "totalBusinessSeats": 20,
    "totalFirstSeats": 10,
    "reservations": [],
    "firstClassPrice": 1517,
    "businessClassPrice": 1105,
    "economyClassPrice": 60,
    "flightNumber": "FH8DVW",
    "departureTime": "2022-02-11T07:25:02.999Z",
    "arrivalTime": "2022-02-11T16:25:02.999Z"
}
```
response sample:

```
{
    "departureLocation": {
        "country": "INDONESIA",
        "city": "MEDAN",
        "airport": "POLONIA",
        "terminal": "3"
    },
    "arrivalLocation": {
        "country": "MALTA",
        "city": "LUQA",
        "airport": "LUQA",
        "terminal": "1"
    },
    "economySeatsAvailable": 4,
    "businessSeatsAvailable": 4,
    "firstSeatsAvailable": 6,
    "totalEconomySeats": 30,
    "totalBusinessSeats": 20,
    "totalFirstSeats": 10,
    "reservations": [],
    "firstClassPrice": 1517,
    "businessClassPrice": 1105,
    "economyClassPrice": 60,
    "flightNumber": "FH8DVW",
    "departureTime": "2022-02-11T07:25:02.999Z",
    "arrivalTime": "2022-02-11T16:25:02.999Z"
}
```

### GET /flights/:flightId
sends a request for getting a flight

flightId is the id for the flight

response sample:

```
{
    "departureLocation": {
        "country": "INDONESIA",
        "city": "MEDAN",
        "airport": "POLONIA",
        "terminal": "3"
    },
    "arrivalLocation": {
        "country": "MALTA",
        "city": "LUQA",
        "airport": "LUQA",
        "terminal": "1"
    },
    "economySeatsAvailable": 4,
    "businessSeatsAvailable": 4,
    "firstSeatsAvailable": 6,
    "totalEconomySeats": 30,
    "totalBusinessSeats": 20,
    "totalFirstSeats": 10,
    "reservations": [],
    "firstClassPrice": 1517,
    "businessClassPrice": 1105,
    "economyClassPrice": 60,
    "flightNumber": "FH8DVW",
    "departureTime": "2022-02-11T07:25:02.999Z",
    "arrivalTime": "2022-02-11T16:25:02.999Z"
}
```

### DELETE /reservations/:reservationId
sends a request for deleting a reservation

reservationId is the id for the reservation

response sample:

```
{
    "_id": {
        "$oid": "61c76e861455ace5bcadf6f4"
    },
    "user": {
        "$oid": "61a762c24c337dff67c229fe"
    },
    "outBoundflight": {
        "$oid": "61a5a12b30240908791077e2"
    },
    "inBoundflight": {
        "$oid": "61a5a12c30240908791077f6"
    },
    "outBoundClass": "Economy",
    "inBoundClass": "Economy",
    "passengers": [{
        "firstName": "Mohamed Amr",
        "lastName": "Mohamed ",
        "passportNumber": "A1133",
        "outBoundSeat": "A32",
        "inBoundSeat": "A32",
        "_id": {
            "$oid": "61c76e861455ace5bcadf6f6"
        }
    }],
    "confirmationNumber": 84466866989,
    "totalPrice": 8800,
    "paymentNumber": "pi_3KAb80Gx4Kq2M7uI0whNvVxl",
}
```

### GET /user
sends a request for getting a user

response sample:
```
{
    "_id": {
        "$oid": "61a762c24c337dff67c229fe"
    },
    "email": "omarelsawi98@gmail.com",
    "firstName": "omar",
    "lastName": "sawi",
    "phoneNumber": "11111111111",
    "reservations": [{
        "$oid": "61c254c9203b67f6fdffdd39"
    }, {
        "$oid": "61c281b2f1abec0ff3f648dc"
    }, {
        "$oid": "61c307413a5f81972956a613"
    }, {
        "$oid": "61c425c3f1abec0ff3f6494c"
    }, {
        "$oid": "61c71581b32f0e6b75452eaa"
    }, {
        "$oid": "61c71bbbb32f0e6b75452eb3"
    }, {
        "$oid": "61c71bbeb32f0e6b75452eba"
    }, {
        "$oid": "61c71bc5b32f0e6b75452ec1"
    }, {
        "$oid": "61c71c3db32f0e6b75452ec5"
    }, {
        "$oid": "61c71cf4b32f0e6b75452ecc"
    }, {
        "$oid": "61c71d6cb32f0e6b75452ed0"
    }, {
        "$oid": "61c71f2718e6ee57dcdc61d9"
    }, {
        "$oid": "61c71f466e2ab5df0bc0dc4a"
    }, {
        "$oid": "61c72d73a27a861df08ab8bb"
    }, {
        "$oid": "61c72f323a31c2b5275effee"
    }, {
        "$oid": "61c72faa3a31c2b5275efff3"
    }, {
        "$oid": "61c734496f154408fc28a274"
    }, {
        "$oid": "61c734c16f154408fc28a27a"
    }, {
        "$oid": "61c746786c20662872a451aa"
    }, {
        "$oid": "61c746f06c20662872a451b4"
    }, {
        "$oid": "61c7521d6c20662872a46fca"
    }, {
        "$oid": "61c752956c20662872a46fd0"
    }, {
        "$oid": "61c76c2c9dbcdd9ba23999cb"
    }, {
        "$oid": "61c76e861455ace5bcadf6f4"
    }],
    "countryCode": "test",
    "passportNumber": "A123",
    "homeAddress": "test"
}
```
### PUT /user
sends a request for editing a user

request sample:
```
{
    "email": "omarelsawi98@gmail.com",
    "firstName": "omar",
    "lastName": "sawi",
    "phoneNumber": "11111111111",
    "reservations": [{
        "$oid": "61c254c9203b67f6fdffdd39"
    }, {
        "$oid": "61c281b2f1abec0ff3f648dc"
    }, {
        "$oid": "61c307413a5f81972956a613"
    }, {
        "$oid": "61c425c3f1abec0ff3f6494c"
    }, {
        "$oid": "61c71581b32f0e6b75452eaa"
    }, {
        "$oid": "61c71bbbb32f0e6b75452eb3"
    }, {
        "$oid": "61c71bbeb32f0e6b75452eba"
    }, {
        "$oid": "61c71bc5b32f0e6b75452ec1"
    }, {
        "$oid": "61c71c3db32f0e6b75452ec5"
    }, {
        "$oid": "61c71cf4b32f0e6b75452ecc"
    }, {
        "$oid": "61c71d6cb32f0e6b75452ed0"
    }, {
        "$oid": "61c71f2718e6ee57dcdc61d9"
    }, {
        "$oid": "61c71f466e2ab5df0bc0dc4a"
    }, {
        "$oid": "61c72d73a27a861df08ab8bb"
    }, {
        "$oid": "61c72f323a31c2b5275effee"
    }, {
        "$oid": "61c72faa3a31c2b5275efff3"
    }, {
        "$oid": "61c734496f154408fc28a274"
    }, {
        "$oid": "61c734c16f154408fc28a27a"
    }, {
        "$oid": "61c746786c20662872a451aa"
    }, {
        "$oid": "61c746f06c20662872a451b4"
    }, {
        "$oid": "61c7521d6c20662872a46fca"
    }, {
        "$oid": "61c752956c20662872a46fd0"
    }, {
        "$oid": "61c76c2c9dbcdd9ba23999cb"
    }, {
        "$oid": "61c76e861455ace5bcadf6f4"
    }],
    "countryCode": "test",
    "passportNumber": "A123",
    "homeAddress": "test"
}
```

response sample:
```
{
    "_id": {
        "$oid": "61a762c24c337dff67c229fe"
    },
    "email": "omarelsawi98@gmail.com",
    "firstName": "omar",
    "lastName": "sawi",
    "phoneNumber": "11111111111",
    "reservations": [{
        "$oid": "61c254c9203b67f6fdffdd39"
    }, {
        "$oid": "61c281b2f1abec0ff3f648dc"
    }, {
        "$oid": "61c307413a5f81972956a613"
    }, {
        "$oid": "61c425c3f1abec0ff3f6494c"
    }, {
        "$oid": "61c71581b32f0e6b75452eaa"
    }, {
        "$oid": "61c71bbbb32f0e6b75452eb3"
    }, {
        "$oid": "61c71bbeb32f0e6b75452eba"
    }, {
        "$oid": "61c71bc5b32f0e6b75452ec1"
    }, {
        "$oid": "61c71c3db32f0e6b75452ec5"
    }, {
        "$oid": "61c71cf4b32f0e6b75452ecc"
    }, {
        "$oid": "61c71d6cb32f0e6b75452ed0"
    }, {
        "$oid": "61c71f2718e6ee57dcdc61d9"
    }, {
        "$oid": "61c71f466e2ab5df0bc0dc4a"
    }, {
        "$oid": "61c72d73a27a861df08ab8bb"
    }, {
        "$oid": "61c72f323a31c2b5275effee"
    }, {
        "$oid": "61c72faa3a31c2b5275efff3"
    }, {
        "$oid": "61c734496f154408fc28a274"
    }, {
        "$oid": "61c734c16f154408fc28a27a"
    }, {
        "$oid": "61c746786c20662872a451aa"
    }, {
        "$oid": "61c746f06c20662872a451b4"
    }, {
        "$oid": "61c7521d6c20662872a46fca"
    }, {
        "$oid": "61c752956c20662872a46fd0"
    }, {
        "$oid": "61c76c2c9dbcdd9ba23999cb"
    }, {
        "$oid": "61c76e861455ace5bcadf6f4"
    }],
    "countryCode": "test",
    "passportNumber": "A123",
    "homeAddress": "test"
}
```

### How to Use?
- Admin

-- Login to your account then choose the admin panel from the navigation bar.

-- From the admin panel you can create ,edit and delete flights.

- Guest

-- From the website homepage you can search for all the available flights depending on your search criteria.

-- From the navigation bar you can click on the register button to register for an account.

- Registered user

-- From the navigation bar click on the login button to login to your account

-- Afterwards, you can search for all the available flights and choose your desired flights and cabin class and then you will be redirected to select your flight seats.

-- After choosing the seats you will be asked to pay for the reservation and you will be redirected to stripe gateway to pay the requested amount.

-- When the payment is completed you will see a summary of your reservation with all the needed details.

-- You can also edit your chosen seats or change a different flight for your reservation from your flights list. You can go there by choosing My Flights button from the navigation bar.

### Credits
**Thanks to all the amazing TAs from the Advanced Computer Lab course**
we were offered a lot of guidance from each one of them.
The course was a great experience that made us gain a lot of experience in all web development fields!

### License

MIT License

Copyright (c) `2021` `Take Off AirLines Web Application`


Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
