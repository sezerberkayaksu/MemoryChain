import React, { useEffect } from "react";
import useSetState from "../Hooks/useSetState";
import MemoryStorageContract from "../../contracts/MemoryStorage.json";
import getWeb3 from "../../getWeb3";
import propTypes from "prop-types";

const Web3Context = React.createContext(null);

export const Web3Provider = (props) =>{
  const [ state, setState ] = useSetState({
    memoryList: [], web3: null, accounts: null, contract: null, error: null, loading: true
  });

  const fetchData = async () => {
    setState({loading: true});
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MemoryStorageContract.networks[networkId];
      if(!deployedNetwork){
        throw new Error("Network Error");
      }
      const contract = new web3.eth.Contract(
        MemoryStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setState({ web3, accounts, contract, loading: false });
      
    } catch (error) {
      setState({error: "Failed to load web3, accounts, or contract. Check console for details."});
    }
  };

  const getMemories = async () => {
    const { contract } = state;
    if(contract){
      const response = await contract.methods.getMemoryList(state.accounts[0]).call();
      setState({ memoryList: response });
    }
    
  };

  useEffect(()=>{
    fetchData();
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
  },[]);

  return(
    <Web3Context.Provider
      value={{
        ...state,
        getMemories
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};

export const withWeb3Context = (WrappedComponent) => {
  return function Web3Component(props) {
    return (
        <Web3Context.Consumer>
          {(contexts) => {
            return <WrappedComponent {...props} {...contexts} />;
          }}
        </Web3Context.Consumer>
    );
  };
};


Web3Provider.propTypes = {
  children: propTypes.any
};
export default withWeb3Context;
