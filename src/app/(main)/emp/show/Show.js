"use client";
import { errorAlert, handleFormDelete, successAlert } from "@lib/Alerts";
import React, { useEffect } from "react";
import state from "@app/store";
import { VStack } from "@chakra-ui/react";
import TopArea from "@lib/TopArea";
import { Cards } from "@lib/Cards";
import PageTitle from "@lib/PageTitle";
import { deleteEmp } from "@server/emp/actions";

export default function Show({ emp }) {
	useEffect(() => {
		state.title = "Employees List";
		state.empTotal = emp.length;
		state.searchResults = emp;

		return () => {
			state.title = "";
			state.searchResults = [];
		};
	}, [emp]);

	// create delete Function
	const deleteFunc = async (e) => {
		await handleFormDelete({
			handleDelete: async () => {
				try {
					const { success, message, error } = await deleteEmp({ _id: e });
					if (!success || error) {
						errorAlert(error || "Failed to delete Employee");
						return;
					}
					successAlert(message);
				} catch (error) {
					errorAlert(error.message || "Failed to delete Employee");
				}
			},
		});
	};
	return (
		<VStack spacing={4} align="center" justify="center" minH="60dvh">
			<TopArea data={emp} path={"/emp/add"} title={"Add New Employee"} />
			<PageTitle />
			<Cards
				data={emp}
				deleteFunc={deleteFunc}
				fieldName={"employee_name"}
				editPath={"emp/edit"}
			/>
		</VStack>
	);
}
