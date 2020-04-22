import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './NewsFeed.module.css'
import Personimage from '../../assets/images/newsFeed.png'
import Card from '../../hoc/Card/Card'

import { data } from './Local_response'
const NewsFeed = (props) => {


    const [properties, setProperties] = useState([])
    useEffect(() => {

        if(props.email != null)
        {
            const  query = '?orderBy="userEmail"&equalTo="' + props.email + '"' 
            axios.get('https://landregistration.firebaseio.com/properties.json' + query)
                .then(Response => {
    
                    console.log(Response.data);
                    const res = { ...Response.data }
                    const propertiesData = Object.keys(res).map((o) => {
    
                        return {
                            state: res[o].state,
                            district: res[o].district,
                            address: res[o].owneraddress,
                            marketvalue: res[o].marketvalue,
                        }
                    })
                    console.log(propertiesData)
                    setProperties(propertiesData)
    
                })
        }
        else {
            alert('please login/signup')
        }
  
    }, [])



    const prop = properties.map((eachprop, i) => {
        return (<div className={classes.NewsFeed}>
            <Card>
                <div className={classes.title}><span>property {i + 1}</span></div>
                <div className={classes.Container}>
                    <div className={classes.NewsImage}>
                        <img src={Personimage} alt="news icon" />

                    </div>
                    <div className={classes.Content}>
                        <h2>{eachprop.state},{eachprop.district}</h2>
                        <p>property description</p>
                        <button className={classes.newsButton}><a target="_blank" href="#">Request buy </a></button>
                    </div>
                </div>


            </Card>
        </div>)
    })


    return (
        <div>
            {prop}
        </div>
    )
}


export default NewsFeed