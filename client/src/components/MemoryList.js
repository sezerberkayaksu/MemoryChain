import React from "react";
import { Container, UnorderedList, ListItem, List } from "@chakra-ui/react";

const MemoryList = ({ memoryList }) => {
  console.log("DENEME",memoryList);
  return (
    <Container>
      <List>
        <UnorderedList>
          {memoryList.map((_memory)=>{
            return(
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
            )
          })}
        </UnorderedList>
      </List>
      
    </Container>
  );
};

export default MemoryList;
