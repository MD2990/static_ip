import React from "react";
import { Button } from "@chakra-ui/react";
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "@/components/ui/menu";
import { LuChevronDown } from "react-icons/lu";
import Link from "next/link";

export default function Menus({ title, children, total }) {
	return (
		<MenuRoot>
			<MenuTrigger asChild outline={"none"} fontSize={[12, 14, 16]}>
				<Button variant="unstyled" size="sm">
					{title} {total} <LuChevronDown />
				</Button>
			</MenuTrigger>
			<MenuContent>{children}</MenuContent>
		</MenuRoot>
	);
}
export function MenuItems({ path, text }) {
	return (
		<MenuItem
			asChild
			value={path}
			outline={"none"}
			cursor={"pointer"}
			color={"gray.700"}
			_hover={{ color: "blue.500", fontWeight: "bold" }}
		>
			<Link href={path}>{text}</Link>
		</MenuItem>
	);
}
