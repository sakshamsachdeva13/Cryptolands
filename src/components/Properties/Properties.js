import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from '../NewsFeed/NewsFeed.module.css'
import Personimage from '../../assets/images/newsFeed.png'
import Card from '../../hoc/Card/Card'
const Properties = (props) => {
    // here we have to show all properties which are available to buy 
    const [available, setavailable] = useState([]);


    useEffect(() => {

        if (props.email != null) {
            axios.get('https://landregistration.firebaseio.com/properties.json')
                .then(Response => {

                    console.log(Response.data)
                    const reciveddata = { ...Response.data };

                    const allproperties = Object.keys(reciveddata);
                    console.log(allproperties)
                    let availProps = []
                    for (let i in allproperties) {
                        if (Response.data[allproperties[i]].userEmail != props.email) {
                            availProps.push({ ...Response.data[allproperties[i]] , propertyId : allproperties[i]});
                        }
                    }
                    setavailable(availProps);

                })

        }

        else {
            alert('please login/signup')
        }


    }, [])

  const requesthandler = (id) => {
const allprops = [...available];
allprops[id].requested = true;
allprops[id].requestedEmail = props.email;
 setavailable([...allprops]);

 axios.put('https://landregistration.firebaseio.com/properties/' + allprops[id].propertyId + '.json', allprops[id])
    .then((response) => console.log(response.data))
  }

    const allproperties = available.map((eachproperty , i)=> {
        return (
            <div className={classes.NewsFeed}>
            <Card>
                <div className={classes.title}><span>property {i + 1}</span></div>
                <div className={classes.Container}>
                    <div className={classes.NewsImage}>
                        <img src={Personimage} alt="news icon" />

                    </div>
                    <div className={classes.Content}>
        <h2>{eachproperty.state}, {eachproperty.email}</h2>
                        <p>property description</p>
                        <button disabled = {eachproperty.requested}  onClick = {() => requesthandler(i)} className={classes.newsButton}><a>{eachproperty.requested ? "Requested" : "Request"} </a></button>
                    </div>
                </div>


            </Card>
        </div>
            
        )
    })

    return (
        <div>
            <h1>these are available properties</h1>
            {allproperties}
        </div>
    )
}


export default Properties