import React, {useEffect} from "react";
import useSetState from "../Hooks/useSetState";
import MemoryStorageContract from "../../contracts/MemoryStorage.json";
import getWeb3 from "../../getWeb3";
import propTypes from "prop-types";

const Web3Context = React.createContext(null);

const Web3Provider = (props) =>{
  const [ state, setState ] = useSetState({
    memoryList: [], web3: null, accounts: null, contract: null, error: null
  });

  const getMemories = async () => {
    const { contract } = state;
    if(contract){
      const response = await contract.methods.getMemory(state.accounts[0]).call();
      setState({ memoryList: response || []});
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
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
        const hasUser = await contract.methods.hasUser(accounts[0]).call();
        if(!hasUser){
          contract.methods.setUser(accounts[0]).call();
        }
        setState({ web3, accounts, contract });
        
      } catch (error) {
        setState({error: "Failed to load web3, accounts, or contract. Check console for details."});
      }
    };
    fetchData();
  },[setState]);

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
      <Web3Provider>
        <Web3Context.Consumer>
          {(contexts) => {
            return <WrappedComponent {...props} {...contexts} />;
          }}
        </Web3Context.Consumer>
      </Web3Provider>
    );
  };
};


Web3Provider.propTypes = {
  children: propTypes.any
};
export default withWeb3Context;
