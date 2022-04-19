import React, { Component } from "react";
import AddMemoryForm from "./components/AddMemoryForm";
import MemoryList from "./components/MemoryList";
import { Heading } from "@chakra-ui/react";
import withWeb3Context from "./components/Web3Context";
import "./App.css";

class App extends Component {

  render() {
    return (
        <div className="App">
          <Heading margin={5}>MemoryChain</Heading>
          {!this.props.web3 ? <div>Loading Web3, accounts, and contract...</div> :
            <>
              <AddMemoryForm
                accounts={this.props.accounts}
                contract={this.props.contract}
                getMemories={this.props.getMemories}
              />
              <MemoryList memoryList={this.props.memoryList || []} />
            </>
          }
         
        </div>
    );
  }
}

export default withWeb3Context(App);
