import React from "react";
import { Container, ListItem, List, Tag, Divider } from "@chakra-ui/react";

const MemoryList = ({ memoryList }) => {
  console.log("DENEME", memoryList);
  return (
    <Container marginTop={5} maxW="md">
      <Divider />
      <List paddingTop={5}>
        {memoryList.map((_memory) => {
          return (
            <ListItem marginBottom={2}>
              <Tag
                _hover={{ backgroundColor: "teal", color: "white" }}
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

export default MemoryList;
