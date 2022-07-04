import React from "react";
import withWeb3Context from "./components/Context/Web3Context";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Error, Navbar } from "./components";
import propTypes from "prop-types";
import { MemoryList, AddMemoryForm, Welcome } from "./pages";

const App = ({
  memoryList,
  getMemories,
  accounts,
  contract,
  loading,
  error
}) => {
  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar accounts={accounts} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="memory"
            element={
              <MemoryList
                memoryList={memoryList || []}
                getMemories={getMemories}
                contextLoading={loading}
                accounts={accounts}
                contract={contract}
              />
            }
          />
          <Route
            path="/memory/add"
            element={
              <AddMemoryForm
                accounts={accounts}
                contract={contract}
                getMemories={getMemories}
                loading={loading}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
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
  loading: propTypes.bool,
  error: propTypes.string
};

export default withWeb3Context(App);
