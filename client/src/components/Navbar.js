import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
  Heading
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ROUTES = {
  "/memory": {
    i18Key: "menu.memories",
    url: "/memory"
  }
};

const Links = ({t, currentPath}) => {
  const activeBackground = useColorModeValue("blue.300", "blue.700");
  return (Object.values(ROUTES).map((link) => {
return (
    <React.Fragment key={link.i18Key}>
      <ChakraLink
        px={[2,2,5]}
        py={[1,1,5]}
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
      }}>
        {t(link.i18Key)}
      </ChakraLink>
    </React.Fragment>
  );
}));
};

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} marginBottom="15px">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            as={"nav"}
            display={{ base: "none", md: "flex" }}
            >
            <Flex w={"content"} marginRight={"15px"} as={Link} to={"/"}>
              <Heading color={"blue.300"} size="md">
                Memory
              </Heading>
              <Heading size="md">
                Chain
              </Heading>
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
              onClick={()=>{navigate("/memory/add");}}
            >
              {t("menu.addMemory")}
            </Button>
            <Avatar
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
              size={"sm"}
              src={
                "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }/>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
            <Flex as={Link} to={"/"}>
              <Heading color={"blue.300"} size="md">
                Memory
              </Heading>
              <Heading size="md">
                Chain
              </Heading>
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
