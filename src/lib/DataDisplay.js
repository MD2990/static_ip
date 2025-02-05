import React, { useTransition } from "react";
import { VStack, HStack, Text, Box, Button } from "@chakra-ui/react";

const DataDisplay = ({ headers, data, ids, onEdit, onDelete }) => {
	const [isPending, startTransition] = useTransition();

	if (!data || data.length === 0) {
		return (
			<Box p={4} m={4} bg="white" w="full" boxShadow="lg" borderRadius="lg">
				<Text
					textAlign="center"
					color="gray.600"
					fontSize={["xl", "2xl", "3xl", "5xl"]}
					p={6}
					fontFamily="fantasy"
					letterSpacing="8px"
					textTransform="uppercase"
					fontWeight="bold"
					textShadow="0px 4px 12px rgba(0, 0, 0, 0.3)"
					userSelect="none"
					background="linear-gradient(to right, #2C5282, #63B3ED)"
					backgroundClip="text"
				>
					No data available to display
				</Text>
			</Box>
		);
	}
	return (
		<Box
			p={4}
			m={4}
			bg="white"
			w="full"
			boxShadow="lg"
			borderRadius="lg"
			overflowX="auto"
		>
			<VStack spacing={0} minW="800px">
				<HStack
					w="full"
					p={4}
					bg="gray.100"
					justify={"space-between"}
					alignItems="center"
					borderTopRadius="lg"
					borderBottom="1px solid"
					borderColor="gray.200"
				>
					{headers.map((header, index) => (
						<Text
							key={index}
							w="20%"
							textAlign="left"
							fontWeight="bold"
							color="gray.700"
						>
							{header}
						</Text>
					))}
					<Box w="20%" textAlign="left" fontWeight="bold" color="gray.700">
						ACTIONS
					</Box>
				</HStack>
				{data.map((dataRow, index) => (
					<HStack
						key={ids[index] || index}
						justify={"space-between"}
						w="full"
						p={4}
						bg={index % 2 === 0 ? "gray.50" : "white"}
						alignItems="center"
						borderBottom="1px solid"
						borderColor="gray.200"
					>
						{Object.entries(dataRow)
							.filter(([key]) => key !== "_id") // Exclude _id from display
							.map(([_, value], idx) => (
								<Box key={idx} w="20%" textAlign="left" color="gray.600">
									{typeof value === "string" ? value : value}
								</Box>
							))}
						<HStack w="20%" justify={"flex-start"}>
							<Button
								size={["sm", "md"]}
								colorPalette="blue"
								onClick={() => {
									startTransition(() => {
										onEdit(ids[index]);
									});
								}}
								loading={isPending}
							>
								Edit
							</Button>
							<Button
								size={["sm", "md"]}
								loading={isPending}
								colorPalette="red"
								onClick={() => {
									startTransition(() => {
										onDelete(ids[index]);
									});
								}}
							>
								Delete
							</Button>
						</HStack>
					</HStack>
				))}
			</VStack>
		</Box>
	);
};

export default DataDisplay;
