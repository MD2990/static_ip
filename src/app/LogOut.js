"use client";
import { Box, Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";
import { BiLogOut } from "react-icons/bi";

export default function LogOut() {
	return (
		<Box p="2" m="2" w="fit-content">
			<Button
				variant={"surface"}
				size={["xs", "sm"]}
				onClick={() => {
					signOut({ callbackUrl: "/" });
				}}
				colorPalette="blue"
			>
				<BiLogOut />
				Sign Out
			</Button>
		</Box>
	);
}
