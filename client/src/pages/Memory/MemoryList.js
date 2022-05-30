import React, { useEffect, useState } from "react";
import { Container, ListItem, List, Tag, Divider, ListIcon, Flex, Center, Stack, Text } from "@chakra-ui/react";
import propTypes from "prop-types";
import { LinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; 

const MemoryList = ({ memoryList, getMemories }) => {
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();

  useEffect(()=>{
    if(memoryList.length === 0 && loading){
      getMemories();
      setLoading(false);
    }
  },[getMemories, memoryList]);

  const renderContent = () => {
   if(memoryList.length === 0 && !loading){
      return (
        <Center>
          <Stack>
          <Text>{t("memoryList.error.emptyList")}</Text>
          <Text
              as={Link}
              to="/memory/add"
              colorScheme={"blue"}
              color="white"
              bg={"blue.400"}
              rounded={"full"}
              textAlign="center"
              padding={2}
              _hover={{
                bg: "blue.500"
              }}>
              {t("memoryList.error.addMemory")}
            </Text>
          </Stack>
        </Center>
      );
   }
   return(
    memoryList.map((_memory, index) => {
      return (
        <ListItem as={Flex} alignItems="flex-start" key={`${index}_${_memory}`} maxHeight="100px" overflow={"hidden"}>
          <Flex direction='column' h='65px' alignItems="center" justifyContent={index !== memoryList.length -1 ? "center" : "flex-start"} marginBottom={2} marginTop={2}>
            <ListIcon as={LinkIcon} color='blue.500' margin={0} marginBottom={2}/>
            {index !== memoryList.length -1 && <Divider orientation='vertical' />}
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
    })
   );
  };

  return (
    <Container maxW="lg">
      <List paddingTop={5} overflow="hidden">
        {renderContent()}
      </List>
    </Container>
  );
};

MemoryList.propTypes = {
  memoryList: propTypes.array,
  getMemories: propTypes.any
};

export default MemoryList;
