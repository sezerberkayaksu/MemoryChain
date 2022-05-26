import React, { useEffect } from "react";
import {
  Container,
  ListItem,
  List,
  Tag,
  Divider,
  ListIcon,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import propTypes from "prop-types";
import { LinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import AddFriendForm from "./AddFriendForm";

const FriendList = ({ memoryList, getMemories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  useEffect(() => {
    memoryList.length === 0 && getMemories();
  }, [getMemories, memoryList]);

  return (
    <Container maxW="lg">
      <List paddingTop={5} overflow="hidden">
        {memoryList.map((_memory, index) => {
          return (
            <ListItem
              as={Flex}
              alignItems="flex-start"
              key={`${index}_${_memory}`}
              maxHeight="100px"
              overflow={"hidden"}
            >
              <Flex
                direction="column"
                h="65px"
                alignItems="center"
                justifyContent={
                  index !== memoryList.length - 1 ? "center" : "flex-start"
                }
                marginBottom={2}
                marginTop={2}
              >
                <ListIcon
                  as={LinkIcon}
                  color="blue.500"
                  margin={0}
                  marginBottom={2}
                />
                {index !== memoryList.length - 1 && (
                  <Divider orientation="vertical" />
                )}
              </Flex>
              <Tag
                marginLeft={2}
                _hover={{ backgroundColor: "blue.500", color: "white" }}
                transition=".3s"
                p={2}
                w={"md"}
                cursor="pointer"
              >
                {_memory}
              </Tag>
            </ListItem>
          );
        })}
      </List>

      <Button onClick={onOpen} float="right" >{t("friends.addFriend.title")}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("friends.addFriend.title")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddFriendForm/>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

FriendList.propTypes = {
  memoryList: propTypes.array,
};

export default FriendList;
