import React from "react";
import { Container, ListItem, List, Tag, Divider } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const MemoryList = ({ memoryList }) => {
  return (
    <Container marginTop={5} maxW="md">
      <Divider />
      <List paddingTop={5}>
        {memoryList.map((_memory, index) => {
          return (
            <ListItem key={`${index}_${_memory}`} marginBottom={2}>
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

MemoryList.PropTypes = {
  memoryList: PropTypes.array
}

export default MemoryList;
