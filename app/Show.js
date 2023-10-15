"use client";
import IPsTopArea from "@/components/IPs/IPsTopArea";
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
    // eslint-disable-next-line valtio/state-snapshot-rule
    return snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE);
  }, [snap.PER_PAGE, snap.offset, snap.searchResults]);

  const editFunc = (e) => `/edit_ip/${e._id} `;

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

      <Paginate />
    </>
  );
}
