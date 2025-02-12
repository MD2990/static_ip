import React from "react";
import { Heading, Center } from "@chakra-ui/react";
import state from "@app/store";
import { useSnapshot } from "valtio";

export default function PageTitle() {
	const snap = useSnapshot(state);
	return (
		<Center textAlign={"center"} pt={[1, 2, 3, 4, 5]}>
			<Heading
				size={["md", "lg", "2xl"]}
				noOfLines={1}
				color={"gray.600"}
				fontFamily={'"Times New Roman", Times, serif'}
				textShadow="2px 2px 5px lightGray"
				textDecoration={"underline"}
			>
				{snap.title}
			</Heading>
		</Center>
	);
}
