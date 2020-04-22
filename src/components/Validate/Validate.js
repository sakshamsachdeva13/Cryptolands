import React, { useEffect , useState} from 'react'
import axios from 'axios'

const Validate = (props) => {

    const [validate , setValidate] = useState([]);
    useEffect(() => {

      axios.get('https://landregistration.firebaseio.com/properties.json')
      .then((response) => {

          const responsedata = Object.keys(response.data)
        console.log(responsedata)
        let tovalidate = [];
            responsedata.map((eachprop) => {

                if(response.data[eachprop].accepted === true && response.data[eachprop].requested === true)
                {
                      tovalidate.push({...response.data[eachprop]})
                }
            })
        
            setValidate(tovalidate);

      })
    } , [])


    console.log(validate)

    const toValidate = validate.map((eachvalid) => {
        return(
            <div>
                <h1>{eachvalid.requestedEmail}</h1>
                <h2>{eachvalid.userEmail}</h2>
                <button onClick = {() => props.buyland(eachvalid)}>approve</button>
            </div>
        )
    })
    return(
        <div>
            <h1>this is to validate</h1>
            {toValidate}
        </div>
    )
}


export default Validate