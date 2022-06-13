import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 20 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}>
            {t("welcome.title.first")}<br />
            <Text as={"span"} color={"blue.400"}>
            {t("welcome.title.second")}
            </Text>
          </Heading>
          <Text color={"gray.500"}>
          {t("welcome.text")}
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}>
            <Button
              colorScheme={"blue"}
              bg={"blue.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "blue.500"
              }}
              onClick={()=>{navigate("/memory/add");}}
              >
              {t("welcome.button")}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Welcome;
