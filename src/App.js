import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import landRegistration from './abis/landRegistration.json'
import Layout from './hoc/Layout/Layout'
import {Route , Switch} from 'react-router-dom'
import RegisterForm from './components/RegisterData/RegisterData'
import LandInfo from './containers/LandInformation/landinformation'
class App extends Component {


  constructor(props) {
    super(props)
    console.log('[APP.JS] this is contructor function')
    this.state = {
      account: '',
      loading: false,

    }
  }
    
  
  async componentDidMount() {
    console.log("[APP.JS] this is componnent did mounnt ")
    // await this.loadWeb3()
    // await this.loadBlockchainData()
  }

  
  render() {
    console.log('[APP.JS] this is render method ')
    return (
      <Layout>
        <Switch>

        <Route path = '/landinfo'  component = {LandInfo}/>
      
        <Route path ="/RegisterForm"  render =  {() => <RegisterForm registerland={this.registerland} />} />
        <Route path = '/'  exact render = {() => <div><h1>this  is landing page</h1></div>} />

        </Switch>
      </Layout>

    )
  }
}

export default App;
