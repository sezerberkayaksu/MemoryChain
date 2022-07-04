import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Stack,
  Link as ChakraLink,
  Heading,
  Select,
  useToast,
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { LANGUAGES } from "../translations/LanguageProvider";

const ROUTES = {
  "/memory": {
    i18Key: "menu.memories",
    url: "/memory"
  }
};

const Links = ({ t, currentPath }) => {
  const activeBackground = useColorModeValue("blue.300", "blue.700");
  return Object.values(ROUTES).map((link) => {
    return (
      <React.Fragment key={link.i18Key}>
        <ChakraLink
          px={[2, 2, 5]}
          py={[1, 1, 5]}
          margin={0}
          rounded="sm"
          color={currentPath === link.url ? "white" : ""}
          bg={currentPath === link.url ? activeBackground : ""}
          transition=".3s"
          as={Link}
          to={link.url}
          _hover={{
            textDecoration: "none",
            color: "white",
            bg: activeBackground
          }}
        >
          {t(link.i18Key)}
        </ChakraLink>
      </React.Fragment>
    );
  });
};

const NavBar = ({ accounts }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();
  const account = accounts ? accounts[0] : "";

  const handleAvatarClick = () => {
    toast.closeAll();
    navigator.clipboard.writeText(account);
    toast({
      title: t("avatar.click.title"),
      description: t("avatar.click.desc"),
      status: "info",
      duration: 1000
    });
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        marginBottom="15px"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
            <Flex w={"content"} marginRight={"15px"} as={Link} to={"/"}>
              <Heading color={"blue.300"} size="md">
                Memory
              </Heading>
              <Heading size="md">Chain</Heading>
            </Flex>
            <Links t={t} currentPath={currentPath} />
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"blue"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={() => {
                navigate("/memory/add");
              }}
            >
              {t("menu.addMemory")}
            </Button>
            <Stack mr={4}>
              <Select
                size={"sm"}
                onChange={handleLanguageChange}
                borderColor={"blue.300"}
                borderRadius={4}
              >
                {LANGUAGES.map((language) => {
                  return (
                    <option key={language} value={language}>
                      {language.toUpperCase()}
                    </option>
                  );
                })}
              </Select>
            </Stack>

            <Stack onClick={handleAvatarClick}>
              <Avatar
                as={Jazzicon}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                size={"sm"}
                diameter={30}
                seed={jsNumberForAddress(account)}
              />
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Flex as={Link} to={"/"}>
                <Heading color={"blue.300"} size="md">
                  Memory
                </Heading>
                <Heading size="md">Chain</Heading>
              </Flex>
              <Links t={t} currentPath={currentPath} />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavBar;
