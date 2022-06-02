import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import LanguageProvider from "./translations/LanguageProvider";
import { Web3Provider } from "./components/Context/Web3Context";


ReactDOM.render(
  <ChakraProvider>
    <LanguageProvider>
      <Web3Provider>
        <App />
      </Web3Provider>
    </LanguageProvider>
  </ChakraProvider>, 
document.getElementById("root"));

