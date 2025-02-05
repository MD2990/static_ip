import React from "react";
import Link from "next/link";
import { useSnapshot } from "valtio";
import state from "@app/store";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IconButton, Table } from "@chakra-ui/react";
function MyTable({ data, deleteFunc, tableHeads, tableRows, editFunc }) {
	const TheTable = () => {
		const snap = useSnapshot(state);

		return (
			<Table.Root>
				<Table.Header bg="gray.50">
					<Table.Row>
						{tableHeads.map((e, i) => {
							return (
								<Table.ColumnHeader
									textAlign="left"
									p={0.5}
									userSelect={"none"}
									key={i}
								>
									{e}

									{tableRows[i]}
								</Table.ColumnHeader>
							);
						})}
					</Table.Row>
				</Table.Header>

				<Table.Body fontSize={["sm", "md", "lg"]}>
					{data?.map((t, index) => {
						return (
							<Table.Row key={t._id}>
								{tableRows.map((e, i) => (
									<Table.Cell
										p={0.7}
										px={[1, 2]}
										key={i}
										textOverflow={"ellipsis"}
										whiteSpace="nowrap"
										overflow={"hidden"}
										maxW="25rem"
									>
										{/* add No field to the table if the field is 0 (NO. field) */}
										{i === 0 && snap.currentPage * snap.PER_PAGE + index + 1}
										{t[e]}
										{e === "edit" && (
											<Link href={editFunc(t)}>
												<IconButton
													_focus={{ boxShadow: "none", outline: "none" }}
													aria-label="Edit"
													icon={<AiFillEdit />}
													variant="unstyled"
													color={"gray.400"}
													fontSize={["xl", "2xl"]}
												/>
											</Link>
										)}
										{e === "delete" && (
											<IconButton
												_focus={{ boxShadow: "none", outline: "none" }}
												aria-label="Delete"
												icon={<AiFillDelete />}
												onClick={() => deleteFunc(t)}
												variant="unstyled"
												color="red.400"
												fontSize={["xl", "2xl"]}
											/>
										)}
									</Table.Cell>
								))}
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		);
	};

	return <TheTable />;
}

export default MyTable;
