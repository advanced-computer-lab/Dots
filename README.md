
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
