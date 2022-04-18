import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Container,
  Box,
} from "@chakra-ui/react";
import { Field, Form,Formik } from "formik";

const AddMemoryForm = ({contract, getMemories}) => {
  
  const handleSubmit = async(values,actions) => {
    try {
      const response = await contract.methods.addMemory(values.memory).call();
      actions.setSubmitting(false)
      getMemories();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxW="md">
      <Formik
        initialValues={{ memory: "" }}
        onSubmit={handleSubmit}
      >
        {(props)=>(
          <Form>
            <Field name="memory">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor="memory">Memory</FormLabel>
                  <Input id="memory" {...field}/>
                  <FormHelperText>
                    Write the memory that you wanna share on chain.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Box
              w="100%"
              display="flex"
              justifyContent="flex-end"
            >
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

export default AddMemoryForm;
