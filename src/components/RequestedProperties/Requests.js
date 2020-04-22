import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Requests = (props) => {
     console.log(props.email)
    const [requestedProps , setRequestedProps] = useState([])

     useEffect(()=> {
    
   axios.get('https://landregistration.firebaseio.com/properties.json')
   .then((response) => {
       const recivedData = {...response.data};
       const statedata = Object.keys(recivedData);
    
       console.log(statedata);
    let requestProperties = [];
        statedata.map((eachprops) => {
   console.log(recivedData[eachprops].userEmail===props.email&& recivedData[eachprops].requested === true )
           if(recivedData[eachprops].userEmail == props.email && recivedData[eachprops].requested === true&& recivedData[eachprops].accepted === false) 
           {

            requestProperties.push({
               ...recivedData[eachprops]
            })
           }

        //    console.log(requestProperties)
     

       })
      console.log(requestProperties)
       setRequestedProps(requestProperties);

   })
     } , [])


     const requestAccepthandler = (i) => {
         let state = [...requestedProps];
          console.log(i)
          console.log(state)
         const acceptedObject = {...state[i]};
        console.log(state[i])
          acceptedObject.accepted = true;
        state[i] = acceptedObject;
         console.log(acceptedObject);
        setRequestedProps(state);
        axios.put('https://landregistration.firebaseio.com/properties/' + acceptedObject.propertyId  + ".json", acceptedObject )
        .then((response) => console.log(response.data))
     }

     const requestedPropsArray = requestedProps.map((eachprops , i) => {

        return (<div>
            <h1>{eachprops.requestedEmail}</h1>
            <p>wantss to buy your property</p>
            <button onClick = {() => requestAccepthandler(i)}>Accept</button><button>Decline</button>
        </div>)
     })
    return(
        <div>
            <h1>requestes</h1>
            {requestedPropsArray}
        </div>
    )
}


export default Requests