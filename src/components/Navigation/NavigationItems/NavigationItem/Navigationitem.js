import React from 'react'
import {Link} from 'react-router-dom'
const Navigationitem = (props) => {

     return (
         <div>
             <Link to ={props.link} >{props.children}</Link>
         </div>
     )
}


export default Navigationitem
