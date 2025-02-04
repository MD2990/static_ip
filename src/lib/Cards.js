"use client";
import React, { useTransition } from "react";
import {
	Card,
	Button,
	Text,
	HStack,
	Separator,
	Stack,
	Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export function Cards({ data, deleteFunc, fieldName, editPath }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<Flex gap="4" align="center" wrap={"wrap"} justify="center">
			{data.map((e) => (
				<Stack
					key={e._id}
					gap="4"
					direction="row"
					wrap="wrap"
					justify="center"
					p="2"
				>
					<Card.Root
						width="320px"
						variant={"subtle"}
						boxShadow={"md"}
						p="1"
						m="1"
						textAlign="center"
					>
						<Card.Body gap="2" p="4" textAlign="center">
							<Card.Title mb="2" color={"gray.500"}>
								{e[fieldName]}
							</Card.Title>
						</Card.Body>
						<Card.Footer justifyContent="center">
							<Button
								flex={1}
								variant="subtle"
								size={"sm"}
								colorPalette={"green"}
								onClick={() => {
									startTransition(() => {
										router.push(`/${editPath}/${e._id}`);
									});
								}}
								loading={isPending}
							>
								Edit
							</Button>
							<Button
								flex={1}
								variant="subtle"
								size={"sm"}
								colorPalette={"red"}
								onClick={() => deleteFunc(e)}
								loading={isPending}
							>
								Delete
							</Button>
						</Card.Footer>
						<Separator />
						<HStack
							fontSize={"x-small"}
							spacing={1}
							justify={"space-between"}
							p="2"
							color={"gray.400"}
							textShadow={"1px 1px 2px white"}
						>
							<Text as="cite">Created: {e.createdAt}</Text>
							<Text as="cite">Updated: {e.updatedAt}</Text>
						</HStack>
					</Card.Root>
				</Stack>
			))}
		</Flex>
	);
}