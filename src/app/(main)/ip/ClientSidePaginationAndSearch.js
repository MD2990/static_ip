import state from "@app/store";
import { Input, Center } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSnapshot } from "valtio";

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
	useEffect(() => {
		// Show pagination if data is more than itemsPerPage after search filter applied or after render
		setShowPagination(filteredData().length > itemsPerPage);
	}, [filteredData, data]);

	const handleSearchChange = (event) => {
		//setSearchTerm(event.target.value);
		state.searchTerm = event.target.value;
		// Reset to first page on new search
		setCurrentPage(0);
	};

	return (
		<>
			<Center>
				{data?.length > 0 && (
					<Input
						w="50%"
						type="search"
						placeholder={"Search By Any Field"}
						value={snap.searchTerm}
						onChange={handleSearchChange}
						size={["sm", "md"]}
						fontSize={["sm", "md"]}
						mb="1rem"
						textAlign={"center"}
					/>
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
