import Web3 from "web3";

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }else if (window.web3) {
        // Legacy dapp browsers...
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        resolve(web3);
      }else {
         // Fallback to localhost; use dev console port by default...
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        resolve(web3);
      }
    });
  });
};

export default getWeb3;
