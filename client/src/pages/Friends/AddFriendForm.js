import React from "react";
import {
  FormControl,
  Input,
  Button,
  Container,
  Box,
  Stack,
  FormLabel
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

const AddFriendForm = ({ accounts, contract, getMemories }) => {
  const { t } = useTranslation();

  const handleSubmit = async (values, actions) => {
    try {
      await contract.methods
        .addFriend(values.memory)
        .send({ from: accounts[0] });
      actions.setSubmitting(false);
      getMemories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxW="md">
      <Formik initialValues={{ memory: "" }} onSubmit={handleSubmit}>
        {(props) => {
          return (
            <Form>
              <Stack>
                <Field name="friend">
                  {({ field }) => {
                    return (
                      <FormControl isRequired>
                        <FormLabel htmlFor="friend">
                          {t("addFriend.form.field.friend")}
                        </FormLabel>
                        <Input id="friend" {...field} />
                      </FormControl>
                    );
                  }}
                </Field>
              </Stack>
              <Box w="100%" display="flex" justifyContent="flex-end">
                <Button
                  _hover={{ boxShadow: "md" }}
                  _active={{ boxShadow: "lg" }}
                  colorScheme="blue"
                  marginTop={4}
                  loadingText={"Sharing"}
                  isLoading={props.isSubmitting}
                  justifyContent="flex-start"
                  type="submit"
                >
                  {t("addFriend.form.submit")}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

AddFriendForm.propTypes = {
  accounts: propTypes.array,
  contract: propTypes.object,
  getMemories: propTypes.func,
  isSubmitting: propTypes.any
};

export default AddFriendForm;
