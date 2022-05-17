import { Center } from "@chakra-ui/react";
import React from "react";
import PropTypes from 'prop-types';

const Error = ({ message }) => {
  return <Center h="100px">{message}</Center>;
};

Error.PropTypes = {
  message: PropTypes.string
}
export default Error;
