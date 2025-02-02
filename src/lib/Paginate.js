import React, { useCallback, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSnapshot } from "valtio";
import state from "../app/store";
import { Center } from "@chakra-ui/react";

export default function Paginate() {
	const snap = useSnapshot(state);

	const pageCount = useCallback(() => {
		state.offset = snap.currentPage * snap.PER_PAGE;
		return Math.ceil(snap.searchResults.length / snap.PER_PAGE);
	}, [snap.PER_PAGE, snap.currentPage, snap.searchResults.length]);

	function handlePageClick({ selected: selectedPage }) {
		state.currentPage = selectedPage;
	}
	useEffect(() => {
		state.currentPage = 0;
	}, [snap.searchResults.length]);

	return snap.searchResults.length ? (
		<Center mt="7">
			<ReactPaginate
				previousLabel={"← Previous"}
				nextLabel={"Next →"}
				pageCount={pageCount()}
				forcePage={0}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				previousLinkClassName={"pagination__link"}
				nextLinkClassName={"pagination__link"}
				disabledClassName={"pagination__link--disabled"}
				activeClassName={"pagination__link--active"}
			/>
		</Center>
	) : null;
}
