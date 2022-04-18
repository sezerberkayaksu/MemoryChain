import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import AddMemoryForm from "./components/AddMemoryForm";
import getWeb3 from "./getWeb3";

import "./App.css";
import MemoryList from "./components/MemoryList";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getMemories = async () => {
    const { contract } = this.state;
    const response = await contract.methods.getMemory().call();
    this.setState({ memoryList: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <AddMemoryForm contract={this.state.contract} getMemories={this.getMemories} />
        <MemoryList memoryList={this.state.memoryList || []}  />
      </div>
    );
  }
}

export default App;
