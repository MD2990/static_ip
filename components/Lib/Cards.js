"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Heading,
  Button,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export function Cards({ data, deleteFunc, fieldName, editPath }) {
  const router = useRouter();
  return (
    <>
      {data.map((e) => (
        <Card
          alignContent={"flex-end"}
          justifyContent={"flex-end"}
          maxW="sm"
          key={e._id}
          boxShadow={"base"}
          bgGradient="linear(gray.200 0%, blue.200 25%, blue.100 50%)"
          p="2"
          m="1"
          mt="10%"
          textAlign={"center"}
        >
          <CardHeader color={"gray.700"} textShadow={"1px 1px 2px lightGray"}>
            <Heading size={["xs", "sm", "md"]} noOfLines={1}>
              {" "}
              {e[fieldName]}
            </Heading>
          </CardHeader>
          <CardFooter>
            <Button
              w="full"
              size={["xs", "sm"]}
              mr="0.5"
              colorScheme="blue"
              onClick={() => router.push(`/${editPath}/${e._id}`)}
            >
              Edit
            </Button>
            <Button
              w="full"
              size={["xs", "sm"]}
              ml="0.5"
              colorScheme="red"
              onClick={() => deleteFunc(e)}
            >
              Delete
            </Button>
          </CardFooter>
          <Divider />
          <HStack fontSize={"xx-small"} spacing={1} justify={"space-between"}>
            <Text as="cite">Created: {e.createdAt}</Text>
            <Text as="cite">Updated: {e.updatedAt}</Text>
          </HStack>
        </Card>
      ))}
    </>
  );
}
