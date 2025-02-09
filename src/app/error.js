"use client"; // Error components must be Client Components
import { Center, Text, VStack } from "@chakra-ui/react";
export default function Error({ reset }) {
	return (
		<Center
			minH="100vh"
			rounded={"lg"}
			cursor={"pointer"}
			onClick={
				// Attempt to recover by trying to re-render the segment
				() => reset()
			}
		>
			<VStack p="1" m="1">
				<Text
					fontSize={[20, 40, 60, 120]}
					noOfLines={1}
					fontWeight={"black"}
					textShadow="0px 0px 6px gray"
					transform={"rotate(8deg)"}
					letterSpacing={"widest"}
					textAlign={"center"}
					color={"red.500"}
				>
					404
				</Text>
				<Text
					fontSize={[10, 20, 45, 50]}
					noOfLines={1}
					fontWeight={"hairline"}
					textShadow="0px 0px 6px pink"
					transform={"rotate(8deg)"}
					letterSpacing={[5, 10, 15, 20]}
					textAlign={"center"}
					color={"red.200"}
				>
					Something went wrong! Try again...
				</Text>
			</VStack>
		</Center>
	);
}
