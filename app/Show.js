"use client";
import IPsTopArea from "@/components/IPs/IPsTopArea";
import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import SearchLabels from "@components/IPs/SearchLabels";
import { handleFormDelete } from "@components/Lib/Alerts";
import MyTable from "@components/Lib/MyTable";
import Paginate from "@components/Lib/Paginate";
import { handleDelete } from "@utils/dbConnect";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";
import state from "@app/store";

export default function Show({ ip }) {
  const snap = useSnapshot(state);
  useEffect(() => {
    state.ips = ip;
    state.searchTerm = "";
    return () => {
      state.searchTerm = "";
      state.isDisabled = false;
      state.ips = [];
    };
  }, [ip]);

  const rs = useCallback(() => {
    return state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE);
  }, [snap.PER_PAGE, snap.offset]);

  const editFunc = (e) => `/edit/${e._id} `;

  const tableHeads = useMemo(
    () => [
      "No.",
      "IP",
      "Location",
      "device type",
      "Added By",
      "Added Date",
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
      "added_date",
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
        handleDelete({ id: e._id }).then(() => {
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
      <IPsTopArea />
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
