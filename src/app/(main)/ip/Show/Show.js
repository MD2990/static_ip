"use client";
import state from "@app/store";
import { errorAlert, handleFormDelete, successAlert } from "@lib/Alerts";
import DataDisplay from "@lib/DataDisplay";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ClientSidePaginationAndSearch from "../ClientSidePaginationAndSearch";
import SearchLabels from "@lib/SearchLabels";
import TopArea from "@lib/TopArea";
import { deleteIP } from "@server/ip/actions";

export default function Show({ ip, devices, empTotal, devicesTotal }) {
	const router = useRouter();
	const ids = ip.map((e) => e._id);
	const deleteFunc = async (e) => {
		await handleFormDelete({
			handleDelete: async () => {
				const { success, message, error } = await deleteIP({ id: e });
				if (!success || error) {
					errorAlert(error || "Failed to delete IP");
					return;
				}
				successAlert(message || `${ip} Deleted Successfully`);
			},
		});
	};

	useEffect(() => {
		state.ip = ip;
		state.title = "IP Addresses";
		state.empTotal = empTotal;
		state.devicesTotal = devicesTotal;
	}, [ip, empTotal, devicesTotal]);

	const filteredData = ["_id"];
	const headers =
		ip.length > 0
			? [
					...Object.keys(ip[0])
						.filter(
							(key) => !filteredData.includes(key) // Exclude _id from headers
						) // Exclude _id from headers */
						.map((key) => key.replace(/_/g, " ").toUpperCase()),
			  ]
			: [];

	return (
		<>
			<TopArea data={ip} path={"/ip/add"} title={"Add New IP"}></TopArea>
			<SearchLabels devices={devices} ip={ip} />
			<ClientSidePaginationAndSearch
				itemsPerPage={10}
				data={ip}
				renderItems={(currentItems) => (
					<DataDisplay
						headers={headers}
						data={currentItems}
						ids={ids}
						onEdit={(e) => router.push(`/ip/edit/${e}`)}
						onDelete={deleteFunc}
					/>
				)}
			/>
		</>
	);
}
