import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import LanguageProvider from "./translations/LanguageProvider";


ReactDOM.render(
  <ChakraProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ChakraProvider>, 
document.getElementById("root"));

