import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";
import state from "../../app/store";
import { handleDelete } from "../../utils/dbConnect";
import { handleFormDelete } from "../Lib/Alerts";
import MyTable from "../Lib/MyTable";
import Paginate from "../Lib/Paginate";
import SearchLabels from "./SearchLabels";
import TopArea from "./TopArea";

export default function Show({ ip }) {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.title = "Static IPs";
    state.ips = ip;
    state.searchTerm = "";
    return () => {
      state.searchTerm = "";
      state.isDisabled = false;
      state.ips = [];
      state.title = "";
    };
  }, [ip]);

  const rs = useCallback(() => {
    // eslint-disable-next-line valtio/state-snapshot-rule
    return snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE);
  }, [snap.searchResults, snap.offset, snap.PER_PAGE]);

  const editFunc = (e) => `/ip/${e._id} `;

  const tableHeads = useMemo(
    () => [
      "No.",
      "IP",
      "Location",
      "device type",
      "Added By",
      "Notes",
      "Edit",
      "Delete",
    ],
    []
  );

  const tableRows = useMemo(
    () => [
      "No",
      "ip",
      "location",
      "device_type",
      "added_by",
      "notes",
      "edit",
      "delete",
    ],
    []
  );
  // create delete Function
  const deleteFunc = useCallback(async (e) => {
    await handleFormDelete({
      handleDelete: () =>
        handleDelete({ api: "ips", id: e._id }).then(() => {
          state.searchResults = state.searchResults.filter(
            (p) => p._id !== e._id
          );
          state.ips = state.ips.filter((p) => p._id !== e._id);
          state.searchTerm = "";
          state.isDisabled = false;
        }),
    });
  }, []);

  return (
    <>
      <TopArea />

      <SearchLabels />

      <Wrap justify={"center"} align="center" ml={["5rem", "6rem"]}>
        <WrapItem overflowX={"auto"}>
          <Box>
            <MyTable
              size={["sm", "md"]}
              tableTitle={`Static IPs`}
              data={rs()}
              {...{
                editFunc,
                tableHeads,
                tableRows,
                deleteFunc,
              }}
            />
          </Box>
        </WrapItem>
      </Wrap>

      <Paginate />
    </>
  );
}
