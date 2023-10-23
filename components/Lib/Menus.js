import React from "react";
import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Menus({ title, children }) {
  return (
    <Menu>
      <MenuButton
        size={["xs", "sm", "md"]}
        colorScheme="twitter"
        as={Button}
        rightIcon={<IoChevronDownCircleOutline />}
        fontSize={["xs", "sm", "md"]}
      >
        {title}
      </MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
}
export function MenuItems({ path, text, Icons }) {
  const router = useRouter();
  return (
    <MenuItem minH="48px" onClick={() => router.push(path)}>
      <Icons />
      <Text as="span" pl="1">
        {text}
      </Text>
    </MenuItem>
  );
}
