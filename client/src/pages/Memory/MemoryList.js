import React, { useEffect, useState } from "react";
import {
  ListItem,
  List,
  Tag,
  Divider,
  ListIcon,
  Flex,
  Center,
  Stack,
  Text,
  Spinner,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import propTypes from "prop-types";
import { LinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MemoryList = ({ memoryList, getMemories, contextLoading }) => {
  const [data, setData] = useState({ all: [] });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    !contextLoading && getMemories();
  }, [contextLoading]);

  useEffect(() => {
    setLoading(true);
    if (memoryList.length > 0 && !contextLoading) {
      const _data = memoryList.reduce(
        (acc, curr) => {
          if (curr.isActive) {
            acc.actives.push(curr);
          } else {
            acc.passives.push(curr);
          }
          acc.all.push(curr);
          return acc;
        },
        {
          all: [],
          actives: [],
          passives: []
        }
      );
      setData(_data);
    }
    setLoading(false);
  }, [memoryList, contextLoading]);

  const renderTag = (_memory, index) => {
    const tagBackground = _memory.isActive ? "blue.500" : "grey.500";
    const tagColor = _memory.isActive ? "white" : "black.500";

    return (
      <ListItem
        as={Flex}
        alignItems="flex-start"
        key={`${index}_${_memory}`}
        maxHeight="65px"
        overflow={"hidden"}
        minWidth="max-content"
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
          as={Flex}
          flex={1}
          marginLeft={2}
          _hover={{ backgroundColor: tagBackground, color: tagColor }}
          transition=".3s"
          p={2}
          w={"md"}
          cursor="pointer"
        >
          {_memory.text}
        </Tag>
      </ListItem>
    );
  };

  const renderList = (_data) => {
    if (_data.length === 0) {
      return (
        <Center>
          <Alert status="error">
            <AlertIcon />
            {t("memoryList.error.emptyList")}
          </Alert>
        </Center>
      );
    }

    return (
      <List paddingTop={5} overflow="hidden">
        {_data.map((_memory, index) => {
          return renderTag(_memory, index);
        })}
      </List>
    );
  };

  if (loading || contextLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (data.all.length === 0) {
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
            }}
          >
            {t("memoryList.error.addMemory")}
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Center>
      <Tabs variant="soft-rounded" minWidth={"500px"}>
        <TabList>
          <Tab _selected={{ color: "white", bg: "blue.300" }}>
            {t("memoryList.tabs.allMemories")}
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.300" }}>
            {t("memoryList.tabs.activeMemories")}
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.300" }}>
            {t("memoryList.tabs.passiveMemories")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{renderList(data.all)}</TabPanel>
          <TabPanel>{renderList(data.actives)}</TabPanel>
          <TabPanel>{renderList(data.passives)}</TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

MemoryList.propTypes = {
  memoryList: propTypes.array,
  getMemories: propTypes.any,
  contextLoading: propTypes.bool
};

export default MemoryList;
