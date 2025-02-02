import { IconButton } from "@chakra-ui/react";
import { Tooltip } from "@components/ui/tooltip";
import React from "react";

export function TopBtn({ title, onClick, Icons }) {
	return (
		<Tooltip
			label={title}
			aria-label={title}
			rounded={"2xl"}
			bg="gray.300"
			color="blue.500"
			hasArrow
			fontSize={["xx-small", "xs", "sm"]}
		>
			<IconButton
				aria-label={title}
				variant="link"
				_hover={{
					transition: "transform .5s ease-in-out",
					transform: "rotate(-10deg)",
				}}
				fontSize={["2xl", "3xl", "5xl"]}
				p={"1"}
				icon={Icons}
				onClick={onClick}
			/>
		</Tooltip>
	);
}
