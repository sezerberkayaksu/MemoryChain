import React, {useEffect} from  "react";
import useSetState from "./Hooks/useSetState";
import MemoryStorageContract from "../contracts/MemoryStorage.json";
import getWeb3 from "../getWeb3";

const Web3Context = React.createContext(null);

const Web3Provider = (props) =>{
  const [ state, setState ] = useSetState({
    memoryList: [], web3: null, accounts: null, contract: null 
  });

  const getMemories = async () => {
    const { contract } = state;
    if(contract){
      const response = await contract.methods.getMemory().call();
      setState({ memoryList: response });
    }
  };



  useEffect(()=>{
    async function fetchData (){
      try {

        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MemoryStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          MemoryStorageContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, accounts, contract: instance });
        
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    }
    fetchData();
    getMemories();
  });

  return(
    <Web3Context.Provider
      value={{
        ...state,
        getMemories
      }}
    >
      {props.children}
    </Web3Context.Provider>
  )
}

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

export default withWeb3Context;