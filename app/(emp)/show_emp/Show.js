"use client";
import IPsTopArea from "@components/IPs/IPsTopArea";
import { handleFormDelete } from "@components/Lib/Alerts";
import { handleDelete } from "@utils/dbConnect";
import React, { useCallback, useEffect } from "react";
import state from "@app/store";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  HStack,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { substring } from "@lib/helpers";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";

export default function Show({ emp }) {
  const snap = useSnapshot(state);
  useEffect(() => {
    state.emp = emp;
    state.searchTerm = "";
    return () => {
      state.searchTerm = "";
      state.emp = [];
    };
  }, [emp]);

  const rs = useCallback(() => {
    // eslint-disable-next-line valtio/state-snapshot-rule
    return snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE);
  }, [snap.PER_PAGE, snap.offset, snap.searchResults]);

  // create delete Function
  const deleteFunc = useCallback(async (e) => {
    await handleFormDelete({
      handleDelete: () =>
        handleDelete({ api: `/edit_emp/api?id=${e._id}` }).then(() => {
          state.searchResults = state.searchResults.filter(
            (p) => p._id !== e._id
          );
          state.emp = state.emp.filter((p) => p._id !== e._id);
          state.searchTerm = "";
        }),
    });
  }, []);

  return (
    <>
      <IPsTopArea
        data={snap.emp}
        path={"/add_emp"}
        title={"Add New Employee"}
      />

      <SimpleGrid
        spacing={1}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Cards data={rs()} deleteFunc={deleteFunc} />
      </SimpleGrid>
    </>
  );
}

function Cards({ data, deleteFunc }) {
  const router = useRouter();
  return (
    <>
      {data.map((e) => (
        <Card
          align="center"
          maxW="sm"
          key={e._id}
          boxShadow={"base"}
          bgGradient="linear(gray.200 0%, blue.200 25%, blue.100 50%)"
          p="2"
          m="2"
        >
          <CardHeader>
            <Heading size="md"> {substring(e.emp_name, 2)}</Heading>
          </CardHeader>
          <CardBody>
            <Text noOfLines={[1, 2, 3]}>{e.emp_name}</Text>
          </CardBody>
          <CardFooter>
            <Button
              size={["xs", "sm"]}
              mr="1"
              colorScheme="blue"
              onClick={() => router.push(`/edit_emp/${e._id}`)}
            >
              Edit
            </Button>
            <Button
              size={["xs", "sm"]}
              ml="1"
              colorScheme="red"
              onClick={() => deleteFunc(e)}
            >
              Delete
            </Button>
          </CardFooter>
          <Divider />
          <HStack
            fontSize={"xx-small"}
            spacing={[1, 2, 3]}
            justify={"space-between"}
          >
            <Text as="cite">Created: {e.createdAt}</Text>
            <Text as="cite">Updated: {e.updatedAt}</Text>
          </HStack>{" "}
        </Card>
      ))}
    </>
  );
}
