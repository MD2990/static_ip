"use client";
import state from "@app/store";
import { Center } from "@chakra-ui/react";
import { handleFormDelete } from "@lib/Alerts";
import DataDisplay from "@lib/DataDisplay";
import { handleDelete } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import ClientSidePaginationAndSearch from "../ClientSidePaginationAndSearch";
import SearchLabels from "@lib/SearchLabels";

export default function Show({ ip, devices, empTotal, devicesTotal }) {
	const router = useRouter();
	const ids = ip.map((e) => e._id);

	const deleteFunc = useCallback(
		async (e) => {
			await handleFormDelete({
				handleDelete: () =>
					handleDelete({ api: `/api?id=${e._id}` }).then(() => {
						// filter out the deleted item
						state.ips = state.ips.filter((item) => item._id !== e._id);
						state.searchTerm = "";
						router.refresh();
					}),
			});
		},
		[router]
	);

	const filteredData = ["_id", "updatedAt", "createdAt", "__v"];
	const headers =
		ip.length > 0
			? [
					...Object.keys(ip[0])
						.filter(
							(key) => !filteredData.includes(key) // Exclude _id from headers
						) // Exclude _id from headers
						.map((key) => key.replace(/_/g, " ").toUpperCase()),
			  ]
			: [];

	return (
		<>
			{/* 	<TopArea data={state.ips} path={"/add_ip"} title={"Add New IP"}></TopArea>
			 */}

			<SearchLabels devices={devices} ip={ip} />

			<ClientSidePaginationAndSearch
				itemsPerPage={2}
				data={
					ip.map((e) => {
						const { _id, updatedAt, createdAt, __v, ...rest } = e;
						return { ...rest };
					}) // Exclude _id from data
				}
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
