import React, { useEffect, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import ReservationCard from "../Summary/ReservationCard.js";
import "./FakePayment.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Component } from "react";


function FakePayment() {
      const [searchParams] = useSearchParams({});
      const [reservation, setReservation] = useState({});
      const [ top , setTop ] = useState({});
      const [ outBound , setOutBound] = useState({});
      const [ inBound , setInBound] = useState({});
      const [confirmationNumber , setConfirmationNumber] = useState({});
      const [flag , setFlag] = useState(false);

       useEffect( async() => {
        console.log(searchParams.get('session_id'));
        const sid = searchParams.get('session_id');
        const session = await axios.post('http://localhost:8000/session', { session_id: sid });
        const outBound = await axios.post('http://localhost:8000/flight', { flightNum: session.data.metadata.depFlightNumber });
         const inBound = await axios.post('http://localhost:8000/flight', { flightNum: session.data.metadata.arrFlightNumber });
         console.log(outBound)
         setTop( { "outBoundClass" : session.data.metadata.outboundClass, "inBoundClass" : session.data.metadata.inboundClass });
         setReservation ( {"passengers" : JSON.parse( session.data.metadata.passengers ) } )
         setConfirmationNumber(session.data.metadata.confirmationNumber);
         setOutBound(outBound.data[0]);
        setInBound(inBound.data[0]);
        setFlag(true);

         const res = await axios.post('http://localhost:8000/reservation', { "confirmNum": session.data.metadata.confirmationNumber })
         console.log(res.data.length);
         if(res.data.length == 0 )
         {
          const result = {
                        "previousStage": { "depchosenflight": outBound.data[0], "returnchosenflight": inBound.data[0]},
                        "outBoundClass": session.data.metadata.outboundClass,
                        "inBoundClass": session.data.metadata.inboundClass,
                        "passengers": JSON.parse( session.data.metadata.passengers ),
                        "numPass": session.data.metadata.numPass,
                        "confirmationNumber": session.data.metadata.confirmationNumber,
                        "paymentNumber": session.data.payment_intent,
                      }
          console.log(result);
          await axios.post('http://localhost:8000/reservationinsertion', result);
          
         }

         
       } , [])


       console.log("top : ", top);
       console.log( "reservation " ,   reservation);
       console.log("outBound : ", outBound);
       console.log("inBound : ", inBound);
       console.log( "confirmation number" , confirmationNumber);


    return (
          flag? <ReservationCard
            reservation={reservation}
            outBound={outBound}
            inBound={inBound}
            top={top}
            confirmationNumber={confirmationNumber}     

           /> : <div></div> 


    )



}





// class FakeClass extends Component {

//   state = {
//     outBound : {},
//     inBound : {},
//     reservations : [],
//     top: 0,
//     flag:false
    
//   }



//    getSession = async (sid) => {
//     const session = await axios.post('http://localhost:8000/session', { session_id: sid });
//     console.log(session.data.metadata.depFlightNumber);
//     console.log(session.data.metadata.arrFlightNumber);
//     const outBound = await axios.post('http://localhost:8000/flight', { flightNum: session.data.metadata.depFlightNumber });
//     const inBound = await axios.post('http://localhost:8000/flight', { flightNum: session.data.metadata.arrFlightNumber });
//     console.log(session);
//     console.log(outBound)
//     console.log(inBound)
//     return [session.data, outBound.data, inBound.data];
//   }
  
  
//    getRes = async (confirmid) => {
//     console.log(confirmid);
//     const res = await axios.post('http://localhost:8000/reservation', { "confirmNum": confirmid })
//     console.log(res.data)
//     return res.data;
//   }
  

//  getElems =  async() => {
//     const sid = this.props.sid
//     console.log(sid)
//     this.getSession(sid).then(res => {
//       console.log(res);
//       const outbound = res[1]
//       const inbound = res[2]
//       const cnum = res[0].metadata.confirmationNumber;
//       const passengers = JSON.parse(res[0].metadata.passengers);
//       console.log("PASSE :  ", passengers);
//       console.log(cnum)
//        this.getRes(cnum).then(reserve => {
//         console.log(reserve)
//         if (reserve.length === 0) {
//           // create res
//           const result = {
//             "previousStage": { "depchosenflight": outbound, "returnchosenflight": inbound },
//             "outBoundClass": res[0].metadata.outboundclass,
//             "inBoundClass": res[0].metadata.inboundClass,
//             "passengers": passengers,
//             "numPass": res[0].metadata.numPass,
//             "confirmationNumber": res[0].metadata.confirmationNumber,
//             "paymentNumber": res[0].payment_intent,
//           }
//            axios.post('http://localhost:8000/reservationinsertion', result);
//           console.log('create reserve with payment and confirmation');
//         }


//         this.setState({outBound : outbound, inBound : inbound, reservations : { "passengers": passengers } , top: { "inBoundClass": res[0].inboundClass,
//          "outBoundClass": res[0].outboundClass , flag:true } })
        

    

       

        

         
      
//       })
//     })

    
//   }

//   componentDidMount() {
//     console.log("here");
//     this.setState({top:22})
//     console.log(this.state.top);
//       this.getElems();
//   }

//   render() {
//     return (
//       // this.state.flag? <ReservationCard
//       //   outBound={this.state.outBound}
//       //   inBound={this.state.inBound}
//       //   reservation={this.state.reservations}
//       //   confirmationNumber={this.state.confirmationNumber}
//       //   top={this.state.top}
//       // /> :
//        <div> </div> 
//       )
  
//   }

  

// }



// function FakePayment(props) {
//   let [searchParams, setSearchParams] = useSearchParams();
//   console.log(searchParams);
//   return (
//     <div>
//       {/* <img id="image" src="/download.jpg" /> */}
//       {/* <ReservationCard
//         outBound={result.previousStage.depchosenflight}
//         inBound={result.previousStage.returnchosenflight}
//         reservation={result.previousStage}
//         confirmationNumber={result.confirmationNumber}
//         top={result}
//       /> */}
//       {/* <ReservationCard
//         outBound={outBound}
//         inBound={inBound}
//         reservation={reservations}
//         confirmationNumber={confirmationNumber}
//         top={top}
//       /> */}
//       <FakeClass sid={searchParams.session_id} />
//     </div>
//   );
  
//   // const [result, setResult] = useState(0);
//   // const [count, setCount] = useState(false);
//   // // const [outBound, setoutBound] = useState([]);
//   // // const [inBound, setinBound] = useState([]);
//   // // const [reservations, setReservations] = useState([]);
//   // // const [top, setTop] = useState(0);
//   // // const [confirmationNumber, setConfirmationNumber] = useState(0);
//   // let location = useLocation();

//   // let outBound = 0;
//   // let inBound = 0;
//   // let reservations = 0;
//   // let top = 0 ;
//   // let confirmationNumber = 0;

//   // useEffect(  async() => {
//   //   const sid = searchParams.get("session_id");
//   //   console.log(sid)
//   //   getSession(sid).then(res => {
//   //     console.log(res);
//   //     const outbound = res[1]
//   //     const inbound = res[2]
//   //     const cnum = res[0].metadata.confirmationNumber;
//   //     const passengers = JSON.parse(res[0].metadata.passengers);
//   //     console.log("PASSE :  ", passengers);
//   //     console.log(cnum)
//   //     getRes(cnum).then(reserve => {
//   //       console.log(reserve)
//   //       if (reserve.length === 0) {
//   //         // create res
//   //         const result = {
//   //           "previousStage": { "depchosenflight": outbound, "returnchosenflight": inbound },
//   //           "outBoundClass": res[0].metadata.outboundclass,
//   //           "inBoundClass": res[0].metadata.inboundClass,
//   //           "passengers": passengers,
//   //           "numPass": res[0].metadata.numPass,
//   //           "confirmationNumber": res[0].metadata.confirmationNumber,
//   //           "paymentNumber": res[0].payment_intent,
//   //         }
//   //         axios.post('http://localhost:8000/reservationinsertion', result);
//   //         console.log('create reserve with payment and confirmation');
//   //       }



//   //      outBound = outbound
//   //     inBound = inbound
//   //     reservations = { "passengers": passengers }
//   //      confirmationNumber = res[0].metadata.confirmationNumber
//   //      top = { "inBoundClass": res[0].inboundClass, "outBoundClass": res[0].outboundClass }
       

       

//   //       // setoutBound(outbound);
//   //       // setinBound(inbound);
//   //       // setReservations({ "passengers": passengers });
//   //       // setConfirmationNumber(res[0].metadata.confirmationNumber);
//   //       // setTop({ "inBoundClass": res[0].inboundClass, "outBoundClass": res[0].outboundClass });

         
      
//   //     })
//   //   })

    
//   // }, []);

 
  

// }

export default FakePayment;























// const getSession = async (sid) => {
//   const session = await axios.post('http://localhost:8000/session', { session_id: sid });
//   console.log(session.data.metadata.depFlightNumber);
//   console.log(session.data.metadata.arrFlightNumber);
//   const outBound = await axios.post('http://localhost:8000/flight', { flightNum: session.data.metadata.depFlightNumber });
//   const inBound = await axios.post('http://localhost:8000/flight', { flightNum: session.data.metadata.arrFlightNumber });
//   console.log(session);
//   console.log(outBound)
//   console.log(inBound)
//   return [session.data, outBound.data, inBound.data];
// }


// const getRes = async (confirmid) => {
//   console.log(confirmid);
//   const res = await axios.post('http://localhost:8000/reservation', { "confirmNum": confirmid })
//   console.log(res.data)
//   return res.data;
// }

// function FakePayment(props) {
//   let [searchParams, setSearchParams] = useSearchParams();
//   const [result, setResult] = useState(0);
//   const [count, setCount] = useState(false);
//   const [outBound, setoutBound] = useState([]);
//   const [inBound, setinBound] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [top, setTop] = useState(0);
//   const [confirmationNumber, setConfirmationNumber] = useState(0);
//   let location = useLocation();

//   useEffect( () => {
//     const sid = searchParams.get("session_id");
//     console.log(sid)
//     getSession(sid).then(res => {
//       console.log(res);
//       const outbound = res[1]
//       const inbound = res[2]
//       const cnum = res[0].metadata.confirmationNumber;
//       const passengers = JSON.parse(res[0].metadata.passengers);
//       console.log("PASSE :  ", passengers);
//       console.log(cnum)
//       getRes(cnum).then(reserve => {
//         console.log(reserve)
//         if (reserve.length === 0) {
//           // create res
//           const result = {
//             "previousStage": { "depchosenflight": outbound, "returnchosenflight": inbound },
//             "outBoundClass": res[0].metadata.outboundclass,
//             "inBoundClass": res[0].metadata.inboundClass,
//             "passengers": passengers,
//             "numPass": res[0].metadata.numPass,
//             "confirmationNumber": res[0].metadata.confirmationNumber,
//             "paymentNumber": res[0].payment_intent,
//           }
//           axios.post('http://localhost:8000/reservationinsertion', result);
//           console.log('create reserve with payment and confirmation');
//         }

//         setoutBound( outBound => outbound);
//         setinBound(inbound);
//         setReservations({ "passengers": passengers });
//         setConfirmationNumber(res[0].metadata.confirmationNumber);
//         setTop({ "inBoundClass": res[0].inboundClass, "outBoundClass": res[0].outboundClass });


//         // top = { "inBoundClass": res[0].inboundClass, "outBoundClass": res[0].outboundClass }
//         // reservations = { "passengers": passengers }
//         // out_bound = outbound
//         // in_bound = inbound
//         // confirmationNum = res[0].metadata.confirmationNumber

//         // console.log("OutBound ", out_bound)
//         // console.log("InBound", in_bound)
//         // console.log("Top", top)
//         // console.log("Reservations", reservations)
//         //  console.log(confirmationNum)

//       })
//     })

    
//   }, [ outBound, inBound, reservations, top, confirmationNumber ]);

//   return (
//     <div>
//       {/* <img id="image" src="/download.jpg" /> */}
//       {/* <ReservationCard
//         outBound={result.previousStage.depchosenflight}
//         inBound={result.previousStage.returnchosenflight}
//         reservation={result.previousStage}
//         confirmationNumber={result.confirmationNumber}
//         top={result}
//       /> */}
//       { console.log(outBound) }
//       <ReservationCard
//         outBound={outBound}
//         inBound={inBound}
//         reservation={reservations}
//         confirmationNumber={confirmationNumber}
//         top={top}
//       />
//     </div>
//   );
  

// }

// export default FakePayment;











 //   const timer = setTimeout(() => {
  //     setCount(true);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);
  // if (!count) {
  //   return (
  //   <div id="parent">
  //     <img id="image" src="/download.jpg" />
  //     <div id="circle">
  //       <CircularProgress />
  //     </div>
  //     <div id="paymentText"> Processing Payment...</div>
  //   </div>
  // );
  // } else