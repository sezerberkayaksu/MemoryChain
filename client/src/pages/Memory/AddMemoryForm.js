import React from "react";
import {
  FormControl,
  Input,
  Button,
  Container,
  Box,
  Stack,
  FormLabel,
  Textarea
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AddMemoryForm = ({ accounts, contract }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      await contract.methods
        .addMemory(values.walletID, values.memory)
        .send({ from: accounts[0] });
      actions.setSubmitting(false);
      navigate("/memory");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxW="md">
      <Formik initialValues={{ walletID: "" ,memory: "" }} onSubmit={handleSubmit}>
        {(props) => {
          return (
            <Form>
              <Stack>
                <Field name="walletID">
                  {({ field }) => {
                    return (
                      <FormControl isRequired>
                        <FormLabel htmlFor="walletID">
                          {t("addMemory.form.field.walletID")}
                        </FormLabel>
                        <Input id="friend" {...field} />
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="memory">
                  {({ field }) => {
                    return (
                      <FormControl isRequired>
                        <FormLabel htmlFor="memory">
                          {t("addMemory.form.field.memory")}
                        </FormLabel>
                        <Textarea id="memory" {...field} />
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
                  {t("addMemory.form.submit")}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

AddMemoryForm.propTypes = {
  accounts: propTypes.array,
  contract: propTypes.object,
  getMemories: propTypes.func,
  isSubmitting: propTypes.any
};

export default AddMemoryForm;
