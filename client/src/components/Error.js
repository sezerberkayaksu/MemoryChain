import { Center } from "@chakra-ui/react";
import React from "react";
import propTypes from 'prop-types';

const Error = ({ message }) => {
  return <Center h="100px">{message}</Center>;
};

Error.propTypes = {
  message: propTypes.string
}
export default Error;
