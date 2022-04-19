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

const SignUp = () => {

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
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
  }
  
export default SignUp;
