# MemoryChain

MemoryChain is a project wich ı started to learn web3 technologies and work on eth blockchain network

## Getting Started

You need to have few NPM packages to start project so:

### Installation
1. Install deps (for server)

 ```sh
   yarn install
 ```
   
2.  Install deps (for client)

   ```sh
     cd ./client yarn install
   ```

## Usage

First of all you need to start truffle server then compile&deploy your smart contract and then start the client to connect app 

1. Start truffle server, make sure that you're in the root directory:

 ```sh
   truffle develop
   ```
2.  Compile & deploy contract, we can do that via one command wich is ```migrate```, make sure you're on the truffle terminal:


 ```sh
    migrate
   ```
   
3. Start the client, open new termianl:

 ```sh
    cd ./client yarn start
   ```
