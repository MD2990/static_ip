import state from "@app/store";
import { Button, HStack, Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useSnapshot } from "valtio";
function SearchLabels({ devices, ip }) {
	const snap = useSnapshot(state);

	// create an array of multiple colors
	const colors = [
		"red.200",
		"green.200",
		"blue.200",
		"yellow.200",
		"orange.200",
		"purple.200",
		"teal.200",
		"gray.200",
	];

	const labelColors = (colors, i, n) => {
		const color = `${colors[i % colors.length].substring(
			0,
			colors[i % colors.length].length - 3
		)}${n}`;
		return color;
	};

	if (!ip?.length) return null;
	return (
		<HStack wrap={"wrap"} p="2" m="2">
			{devices.map((e, i) => {
				return (
					<Flex
						align="flex-start"
						key={i}
						cursor={"pointer"}
						userSelect="none"
						_hover={{
							transition: "transform .7s ease-in-out",
							transform: "rotate(8deg)",
						}}
					>
						<Box
							fontSize={["xs", "sm"]}
							bgColor={colors[i % colors.length]}
							textAlign={"center"}
							p="1"
							color={labelColors(colors, i, 600)}
							rounded={"sm"}
							onClick={() => {
								state.isDisabled = true;
								state.searchTerm = e._id;
							}}
						>
							{e._id} : {e.count}
							<Text
								textAlign={"center"}
								color={labelColors(colors, i, 400)}
								fontSize={[8, 10, 12]}
								fontWeight="bold"
								textShadow="0px 1px 0px white"
							>
								{`${Math.round((e.count / state.ip.length) * 100)} %`}
							</Text>
						</Box>
					</Flex>
				);
			})}

			{snap.isDisabled && snap.searchTerm.length > 0 && (
				<Button
					colorScheme="gray"
					fontSize={["sm", "md", "lg", "xl"]}
					color="red.500"
					h="auto"
					onClick={() => {
						state.searchTerm = "";
						state.isDisabled = false;
					}}
				>
					☓
				</Button>
			)}
		</HStack>
	);
}

export default React.memo(SearchLabels);
