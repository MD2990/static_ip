import React from "react";
import { VStack, HStack, Text, Box, Button } from "@chakra-ui/react";

const DataDisplay = ({ headers, data, ids, onEdit, onDelete }) => {
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
							.map(([key, value], idx) => (
								<Box key={idx} w="20%" textAlign="left" color="gray.600">
									{typeof value === "string" ? value : value}
								</Box>
							))}
						<HStack w="20%" justify={"flex-start"}>
							<Button
								size={["sm", "md"]}
								colorPalette="blue"
								onClick={() => onEdit(ids[index])}
							>
								Edit
							</Button>
							<Button
								size={["sm", "md"]}
								colorPalette="red"
								onClick={() => onDelete(ids[index])}
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
