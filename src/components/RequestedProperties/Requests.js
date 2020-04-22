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
   console.log(recivedData[eachprops].userEmail===props.email&& recivedData[eachprops].requested === true)
           if(recivedData[eachprops].userEmail == props.email && recivedData[eachprops].requested === true) 
           {

            requestProperties.push({
                requester : recivedData[eachprops].requestedEmail ,
                 propertyId : recivedData[eachprops].propertyId
            })
           }

        //    console.log(requestProperties)
     

       })
      console.log(requestProperties)
       setRequestedProps(requestProperties);

   })
     } , [])


     const requestedPropsArray = requestedProps.map((eachprops) => {

        return (<div>
            <h1>{eachprops.requester}</h1>
            <p>wantss to buy your property</p>
            <button>Accept</button><button>Decline</button>
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