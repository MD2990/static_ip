"use client";
import { handleFormDelete } from "@lib/Alerts";
import { handleDelete } from "@utils/dbConnect";
import React, { useCallback, useEffect } from "react";
import state from "@app/store";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import TopArea from "@lib/TopArea";
import { Cards } from "@lib/Cards";
import PageTitle from "@lib/PageTitle";
import { setLocalStorage } from "@lib/helpers";
import { useRouter } from "next/navigation";

export default function Show({ emp }) {
	const snap = useSnapshot(state);

	const router = useRouter();

	useEffect(() => {
		state.title = "Employees List";
		state.emp = emp;
		state.searchTerm = "";
		if (typeof window !== "undefined") {
			setLocalStorage({ key: "empTotal", obj: emp.length });
		}

		return () => {
			state.searchTerm = "";
			state.emp = [];
			state.title = "";
		};
	}, [emp]);

	const rs = useCallback(() => {
		// eslint-disable-next-line valtio/state-snapshot-rule
		return snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE);
	}, [snap.PER_PAGE, snap.offset, snap.searchResults]);

	// create delete Function
	const deleteFunc = useCallback(
		async (e) => {
			await handleFormDelete({
				handleDelete: () =>
					handleDelete({ api: `/edit_emp/api?id=${e._id}` }).then(() => {
						state.searchResults = state.searchResults.filter(
							(p) => p._id !== e._id
						);
						state.emp = state.emp.filter((p) => p._id !== e._id);
						state.searchTerm = "";
						router.refresh();
						state.empTotal = state.emp.length;
					}),
			});
		},
		[router]
	);

	return (
		<>
			<TopArea data={snap.emp} path={"/add_emp"} title={"Add New Employee"} />
			<PageTitle />

			{snap.emp.length === 0 ? (
				<Heading
					size={["sm", "md", "lg", "2xl"]}
					align="center"
					mt="10%"
					noOfLines={1}
					color={"gray.500"}
					fontFamily={'"Times New Roman", Times, serif'}
				>
					No Employees Added Yet ...
				</Heading>
			) : (
				<SimpleGrid
					spacing={1}
					templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
				>
					<Cards
						data={rs()}
						deleteFunc={deleteFunc}
						fieldName={"employee_name"}
						editPath={"edit_emp"}
					/>
				</SimpleGrid>
			)}
		</>
	);
}
