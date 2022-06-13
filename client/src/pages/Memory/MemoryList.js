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
  AlertIcon,
  Button,
  HStack
} from "@chakra-ui/react";
import propTypes from "prop-types";
import { LinkIcon, NotAllowedIcon, TimeIcon, CheckIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MEMORY_STATUS = {
  "1": {
  title: "ACTIVE",
    tagBackground: "blue.500",
    tagColor: "white",
    TagIcon: LinkIcon,
    buttonColorScheme: "red",
    ButtonIcon: NotAllowedIcon,
    buttonIntl: "toHide",
    targetStatus: -1
  },
  "-1": {
    title: "HIDDEN",
    tagBackground: "grey.500",
    tagColor: "black.500",
    TagIcon: NotAllowedIcon
  },
  "0": {
    title: "PENDING",
    tagBackground: "grey.500",
    tagColor: "black.500",
    TagIcon: TimeIcon,
    buttonColorScheme: "blue",
    ButtonIcon: CheckIcon,
    buttonIntl: "toApply",
    targetStatus: 1
  }
};

const MemoryList = ({ accounts, contract, memoryList, getMemories, contextLoading }) => {
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
          if (curr.status === "1") {
            acc.actives.push(curr);
          } else if (curr.status === "0") {
            acc.pendings.push(curr);
          }else{
            acc.hiddens.push(curr);
          }
          acc.all.push(curr);
          return acc;
        },
        {
          all: [],
          actives: [],
          hiddens: [],
          pendings: []
        }
      );
      setData(_data);
    }
    setLoading(false);
  }, [memoryList, contextLoading]);

  const setMemoryStatus = async (_memory, _status) => {
    try {
      await contract.methods
        .changeMemoryStatus(accounts[0], data.all.indexOf(_memory), _status )
        .send({ from: accounts[0] });
      document.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const renderTag = (_memory, index, _dataLength) => {
    const { 
      tagBackground,
      tagColor,
      TagIcon,
      buttonColorScheme,
      ButtonIcon,
      buttonIntl,
      targetStatus
    } = MEMORY_STATUS[_memory.status.toString()];

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
            index !== _dataLength - 1 ? "center" : "flex-start"
          }
          marginBottom={2}
          marginTop={2}
        >
          <ListIcon
            as={TagIcon}
            color="blue.500"
            margin={0}
            marginBottom={2}
          />
          {index !== _dataLength - 1 && (
            <Divider orientation="vertical" />
          )}
        </Flex>
        <HStack spacing="5px">
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
          {buttonIntl &&
           <Button
              padding="8px"
              colorScheme={buttonColorScheme}
              fontSize="sm"
              size={"xs"}
              lineHeight="1.2"
              height={"100%"}
              onClick={()=>{setMemoryStatus(_memory, targetStatus);}}
            >
              <ButtonIcon marginRight={"5px"} />{t(`memoryList.${buttonIntl}`)}
            </Button>
          }
         
        </HStack>
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
          return renderTag(_memory, index, _data.length);
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
      <Tabs variant="soft-rounded" minWidth={"xl"}>
        <TabList>
          <Tab _selected={{ color: "white", bg: "blue.300" }}>
            {t("memoryList.tabs.activeMemories")}
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.300" }}>
            {t("memoryList.tabs.hiddenMemories")}
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.300" }}>
            {t("memoryList.tabs.pendingMemories")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{renderList(data.actives)}</TabPanel>
          <TabPanel>{renderList(data.hiddens)}</TabPanel>
          <TabPanel>{renderList(data.pendings)}</TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

MemoryList.propTypes = {
  memoryList: propTypes.array,
  getMemories: propTypes.any,
  contextLoading: propTypes.bool,
  accounts: propTypes.array,
  contract: propTypes.object
};

export default MemoryList;
