"use client";
import { Box, Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogOut() {
  return (
    <Box p="2" m="2" w="fit-content">
      <Button
        size={["sm", "md"]}
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
        colorScheme="blue"
      >
        Sign Out
      </Button>
    </Box>
  );
}
