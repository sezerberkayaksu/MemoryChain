import React from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  Button,
  Container,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
 
const AddMemoryForm = ({ accounts, contract, getMemories }) => {
  const handleSubmit = async (values, actions) => {
    try {
      await contract.methods
        .addMemory(values.memory)
        .send({ from: accounts[0] });
      actions.setSubmitting(false);
      getMemories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxW="md">
      <Formik initialValues={{ memory: "" }} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <Field name="memory">
              {({ field }) => (
                <FormControl isRequired>
                  <Input id="memory" {...field} />
                  <FormHelperText float={"left"}>
                    Write the memory that you wanna share on chain.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Box w="100%" display="flex" justifyContent="flex-end">
              <Button
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
                colorScheme="teal"
                marginTop={4}
                loadingText={"Sharing"}
                isLoading={props.isSubmitting}
                justifyContent="flex-start"
                type="submit"
              >
                Share Memory
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

AddMemoryForm.propTypes={
  accounts:PropTypes.object,
  contract: PropTypes.object,
  getMemories: PropTypes.func,
  isSubmitting: PropTypes.any,
}

export default AddMemoryForm;
