import React from "react";
import withWeb3Context from "./components/HOC/Web3Context";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Error, Navbar} from "./components";
import propTypes from "prop-types";
import { MemoryList, AddMemoryForm, Welcome, FriendList, AddFriendForm } from "./pages"; 

const App = ({ memoryList, getMemories, accounts, contract, error }) => {
    if (error) {
      return <Error message={error} />;
    }
    
    return (
      <div className="app">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route
            path="/"
            element={<Welcome />}
          />
          <Route
            path="memory"
            element={<MemoryList memoryList={memoryList || []} getMemories={getMemories}/>}
          />
          <Route
            path="/memory/add"
            element={
              <AddMemoryForm
                accounts={accounts}
                contract={contract}
                getMemories={getMemories}
              />
            }
          />
          <Route
            path="/friends"
            element={
              <FriendList
                memoryList={memoryList || []} getMemories={getMemories}
              />
            }
          />
          <Route
            path="/friends/add"
            element={
              <AddFriendForm
                accounts={accounts}
                contract={contract}
                getMemories={getMemories}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/"/>}
          />
        </Routes>
      </BrowserRouter>
      </div>
    );
};

App.propTypes = {
  web3: propTypes.object,
  accounts: propTypes.array,
  contract: propTypes.object,
  getMemories: propTypes.func,
  memoryList: propTypes.array,
  error: propTypes.string
};

export default withWeb3Context(App);
