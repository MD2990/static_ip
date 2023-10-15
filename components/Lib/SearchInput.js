import state from "@app/store";
import { Input } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSnapshot } from "valtio";

function SearchInputField() {
  const snap = useSnapshot(state);
  const handleChange = (e) => {
    state.searchTerm = e.target.value;
    // hide the X button
    if (state.searchTerm.trim().length) {
      state.isDisabled = false;
    }
  };
  return (
    <Input
      rounded="2xl"
      fontSize={["sm", "md", "lg", "xl"]}
      textAlign="center"
      p="4"
      mx="4"
      minW="5rem"
      size="lg"
      type="search"
      placeholder="Search by any field"
      value={snap.searchTerm}
      onChange={handleChange}
    />
  );
}

export default function SearchInput({ searchData }) {
  const snap = useSnapshot(state);
  const myFilter = ({ arr, searchTerm }) => {
    if (!arr.length || typeof arr === "string") return [];
    const results =
      arr?.filter((e) => {
        return Object.keys(e).some((key) =>
          e[key]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase().trim())
        );
      }) || [];

    return results;
  };

  useEffect(() => {
    state.searchTerm = "";
  }, []);

  useEffect(() => {
    state.searchResults = myFilter({
      arr: searchData,
      searchTerm: snap.searchTerm,
    });
  }, [searchData, snap.searchTerm]);

  return <SearchInputField />;
}
