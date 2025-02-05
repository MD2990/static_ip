"use client";
import { errorAlert, handleFormDelete, successAlert } from "@lib/Alerts";
import React, { useCallback, useEffect } from "react";
import state from "@app/store";
import { VStack } from "@chakra-ui/react";
import TopArea from "@lib/TopArea";
import { Cards } from "../../../../lib/Cards";
import PageTitle from "@lib/PageTitle";
import { deleteDevice } from "@server/devices/actions";

export default function Show({ device }) {
	useEffect(() => {
		state.title = "Devices";
		state.devicesTotal = device.length;
		state.searchResults = device;

		return () => {
			state.title = "";
			state.searchResults = [];
		};
	}, [device]);

	// create delete Function
	const deleteFunc = useCallback(async (e) => {
		await handleFormDelete({
			handleDelete: async () => {
				try {
					await deleteDevice(e);
					successAlert("Device Deleted Successfully");
				} catch (error) {
					errorAlert(error.message);
				}
			},
		});
	}, []);
	return (
		<VStack spacing={4} align="center" justify="center" minH="60dvh">
			<TopArea data={device} path={"/devices/add"} title={"Add New Employee"} />
			<PageTitle />
			<Cards
				data={device}
				deleteFunc={deleteFunc}
				fieldName={"device_type"}
				editPath={"devices/edit"}
			/>
		</VStack>
	);
}
