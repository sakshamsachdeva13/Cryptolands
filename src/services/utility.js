async function loadWeb3() {
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

  async function loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    // const acc = await web3.eth.accounts;
    console.log(accounts);
    // console.log(accounts)
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

  registerland = async (event) => {
    event.preventDefault();
    try {


      const state = event.target[0].value;
      const district = event.target[1].value;
      const village = event.target[2].value;
      const survnum = event.target[3].value - 0;
      const owneraddress = this.state.account;
      const marketvalue = event.target[4].value - 0;
      console.log(this.state.account)
      const status = await this.state.landregister.methods.Registration(state, district, village, survnum, owneraddress, marketvalue, 2112).call({ from: this.state.account });

      console.log(status);
    }
    catch (err) {
      console.log(err);
    }
  }