import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import landRegistration from './abis/landRegistration.json'
import Layout from './hoc/Layout/Layout'
import { Route, Switch, Redirect } from 'react-router-dom'
import RegisterForm from './components/RegisterData/RegisterData'
import LandInfo from './containers/LandInformation/landinformation'
import NewsFeed from './components/NewsFeed/NewsFeed';
import Login from './components/Login/Login'
import properties from './components/Properties/Properties'
import axios from 'axios'
import Properties from './components/Properties/Properties';
import Requests from './components/RequestedProperties/Requests'
import Validate from './components/Validate/Validate'
class App extends Component {


  constructor(props) {
    super(props)
    console.log('[APP.JS] this is contructor function')
    this.state = {
      account: '',
      loading: false,
      email: "admin"
    }
  }

  setemail = (email) => {

    this.setState({ email: email })
  }

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  loadBlockchainData = async () => {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()

    console.log(accounts);

    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = landRegistration.networks[networkId]
    console.log(networkData)
    if (networkData) {

      const landregister = web3.eth.Contract(landRegistration.abi, networkData.address)
      await landregister.methods.addSuperAdmin(this.state.account, "dilli")
      this.setState({ landregister })

      const properties = await this.state.landregister.methods.viewAssets().call({ from: this.state.account });
      console.log(properties);
    }
  }

  buylandhandler = async (property) => {

    property.userEmail = property.requestedEmail;
    property.requested = false;
    property.accepted = false;

    const buyland = await this.state.landregister.methods.buyProperty(2211);

    axios.put('https://landregistration.firebaseio.com/properties/' + property.propertyId + '.json', property)
      .then((response) => {
        alert('the property has been sold to requested Person')
      })

  }

  registerland = async (event) => {
    event.preventDefault();
    try {
      const state = event.target[0].value;
      const district = event.target[1].value;
      const village = event.target[2].value;
      const survnum = event.target[3].value;
      const owneraddress = this.state.account;
      const marketvalue = event.target[4].value;
      console.log(this.state.account)
      const LandData = {
        state: state,
        district: district,
        village: village,
        surveynum: survnum,
        owneraddress: owneraddress,
        marketvalue: marketvalue,
        userEmail: this.state.email,
        requested: false,
        propertyId: null,
        accepted: false
      }

      if (LandData.userEmail != null) {
        axios.post('https://landregistration.firebaseio.com/properties.json', LandData)
          .then((response) => { console.log(response) })
          .catch(err => console.log(err))


        const status = await this.state.landregister.methods.Registration(state, district, village, survnum, owneraddress, marketvalue, 2112).send({ from: this.state.account });
        console.log(status);

      } else {
        alert('please login/signup')

      }

    }
    catch (err) {
      console.log(err);
    }
  }


  async componentDidMount() {
    console.log("[APP.JS] this is componnent did mounnt ")
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


  render() {
    console.log('[APP.JS] this is render method ')

    let route = (
      <Switch>

        <Route path='/login' render={() => <Login address={this.state.account} setemail={this.setemail} />} />

        <Route path="/RegisterForm" render={() => <RegisterForm email={this.state.email} registerland={this.registerland} />} />
        <Route path='/buy' render={() => <Properties email={this.state.email} />} />
        <Route path='/Requests' render={() => <Requests email={this.state.email} />} />

        <Route path='/' exact render={() => <NewsFeed email={this.state.email} />} />
        <Redirect to='/' />
      </Switch>
    )


    if (this.state.email == "admin") {
      route = (<Switch>
        <Route path='/login' render={() => <Login address={this.state.account} setemail={this.setemail} />} />
        <Route path='/Validate' render={() => <Validate buyland={this.buylandhandler} />} />
        <Redirect to="/login" />
      </Switch>)
    }
    return (
      <Layout email={this.state.email}>
        {route}

      </Layout>

    )
  }
}

export default App;
