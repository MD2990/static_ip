import state from "@app/store";
import { Center } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSnapshot } from "valtio";
import { Box, Field, Input, defineStyle } from "@chakra-ui/react";

const ClientSidePaginationAndSearch = ({
	itemsPerPage = 5,
	renderItems,
	data = [],
}) => {
	const snap = useSnapshot(state);
	const [currentPage, setCurrentPage] = useState(0);

	// Show pagination if data is more than itemsPerPage on first render
	const [showPagination, setShowPagination] = useState(
		data?.length > itemsPerPage
	);

	const handlePageClick = (event) => {
		setCurrentPage(event.selected);
	};

	const filteredData = useCallback(() => {
		return data.filter((item) =>
			Object.values(item).some((value) =>
				value
					.toString()
					.toLowerCase()
					.includes(state.searchTerm.toLowerCase().trim())
			)
		);
	}, [data]);

	const offset = currentPage * itemsPerPage;
	const currentItems = filteredData().slice(offset, offset + itemsPerPage);

	useEffect(() => {
		state.searchResults = filteredData();
	}, [filteredData, data]);
	const filteredDataLength = filteredData().length;
	const dataLength = data.length;
	useEffect(() => {
		// Show pagination if data is more than itemsPerPage after search filter applied or after render
		setShowPagination(filteredData().length > itemsPerPage);
	}, [dataLength, filteredDataLength]);

	const handleSearchChange = (event) => {
		//setSearchTerm(event.target.value);
		state.searchTerm = event.target.value;
		// Reset to first page on new search
		setCurrentPage(0);
	};
	const floatingStyles = defineStyle({
		pos: "absolute",
		bg: "bg",
		px: "0.5",
		top: "-3",
		insetStart: "2",
		fontWeight: "normal",
		pointerEvents: "none",
		transition: "position",
		_peerPlaceholderShown: {
			color: "gray.500",
			top: "2.5",
			insetStart: "3",
		},
		_peerFocusVisible: {
			color: "blue.300",
			top: "-3",
			insetStart: "2",
		},
	});

	return (
		<>
			<Center>
				{data?.length > 0 && (
					<Field.Root>
						<Box pos="relative" w="50%" textAlign="center" alignSelf={"center"}>
							<Input
								className="peer"
								placeholder=""
								value={snap.searchTerm}
								onChange={handleSearchChange}
								size={["sm", "md"]}
								fontSize={["sm", "md"]}
								mb="1rem"
								textAlign={"center"}
								focusRingColor={"blue.400"}
								rounded={"lg"}
							/>
							<Field.Label css={floatingStyles}>
								Search By Any Field
							</Field.Label>
						</Box>
					</Field.Root>
				)}
			</Center>
			<Center>{renderItems(currentItems)} </Center>
			{showPagination && (
				<Center>
					<ReactPaginate
						previousLabel={"Previous"}
						nextLabel={"Next"}
						breakLabel={"..."}
						forcePage={currentPage}
						breakClassName={"break-me"}
						pageCount={Math.ceil(filteredData().length / itemsPerPage)}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={handlePageClick}
						containerClassName={"pagination"}
						activeClassName={"active"}
					/>
				</Center>
			)}
		</>
	);
};

export default ClientSidePaginationAndSearch;
