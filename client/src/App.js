import React, { Component } from "react";
import AddMemoryForm from "./components/AddMemoryForm";
import MemoryList from "./components/MemoryList";
import { Heading } from "@chakra-ui/react";
import withWeb3Context from "./components/Web3Context";
import "./App.css";
import Error from "./components/Error";
import PropTypes from 'prop-types';


class App extends Component {
  
  render() {
    if(this.props?.error){
      return(
        <Error message={this.props.error} />
      )
    }
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

App.propTypes={
  web3: PropTypes.object,
  accounts:PropTypes.object,
  contract: PropTypes.object,
  getMemories: PropTypes.func,
  memoryList: PropTypes.array,
  error: PropTypes.string,
}

export default withWeb3Context(App);
