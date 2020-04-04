import React , {Component} from 'react'
import Toolbar from '../../components/Toolbar/toolbar'
class Layout extends Component {
   
    constructor(props) {
      super(props)
       console.log("[LAYOUT.JS]   this is contructor")
       this.state = {
           name : "ritu"
       }
    }

    componentDidMount() {
        console.log('[LAYOUT.JS] this is component did mount')
         
    }
//   static  getDerivedStateFromProps(props , state) {

//         console.log("[LAYOUT.JS] this is get derived state from props")

//          return {
//              name : "saksham"
//          }
//     }
    stateChanged = () => {

        this.setState({
            name : "rajeev"
        })
    }
    componentDidUpdate() {

        console.log('[LAYOUT.JS] this is component did update')

    }


    render() {
     console.log("[LAYOUT.JS this is render ")

      return (
          <div>
        <Toolbar />
              {this.props.children}

          </div>
      )
    }
}

export default Layout 