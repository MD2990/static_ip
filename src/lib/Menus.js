import React from "react";

import { IoChevronDownCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "@components/ui/menu";
import { Button } from "@chakra-ui/react";

export default function Menus({ title, children, total }) {
	return null;
	/* 	<MenuRoot>
			<MenuTrigger asChild>
				<MenuTrigger>
					<Button variant="outline" size="sm">
						<IoChevronDownCircleOutline />
					</Button>
				</MenuTrigger>
				<MenuContent>{total || 0}</MenuContent>
			</MenuTrigger>
			<MenuItem>{children}</MenuItem>
		</MenuRoot> */
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
