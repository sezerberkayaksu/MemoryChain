import React, { useEffect } from "react";
import { Container, ListItem, List, Tag, Divider, ListIcon, Flex } from "@chakra-ui/react";
import propTypes from 'prop-types';
import { LinkIcon } from "@chakra-ui/icons";

const MemoryList = ({ memoryList, getMemories }) => {

  useEffect(()=>{
    memoryList.length===0&& getMemories();
  },[getMemories, memoryList])

  return (
    <Container maxW="lg">
      <List paddingTop={5} overflow="hidden">
        {memoryList.map((_memory, index) => {
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
        })}
      </List>
    </Container>
  );
};

MemoryList.propTypes = {
  memoryList: propTypes.array
}

export default MemoryList;
