import React from "react";
import {
  FormControl,
  Input,
  Button,
  Container,
  Box,
  Stack,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import propTypes from "prop-types";
import { useTranslation } from 'react-i18next';
 
const AddMemoryForm = ({ accounts, contract, getMemories }) => {
  const { t } = useTranslation();

  const handleSubmit = async (values, actions) => {
    try {
      console.log("ACCOUNTs",accounts[0]);
      console.log("DENEM",values);
      await contract.methods
        .addMemory(accounts[0], values.friend, values.memory)
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
            <Stack>
              <Field name="friend">
                {({ field }) => (
                  <FormControl isRequired>
                    <FormLabel htmlFor="friend">{t("addMemory.form.field.friend")}</FormLabel>
                    <Input id="friend" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="memory">
                {({ field }) => (
                  <FormControl isRequired>
                    <FormLabel htmlFor="memory">{t("addMemory.form.field.memory")}</FormLabel>
                    <Textarea id="memory" {...field} />
                  </FormControl>
                )}
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
        )}
      </Formik>
    </Container>
  );
};

AddMemoryForm.propTypes={
  accounts:propTypes.array,
  contract: propTypes.object,
  getMemories: propTypes.func,
  isSubmitting: propTypes.any,
}

export default AddMemoryForm;
