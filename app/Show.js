"use client";
import IPsTopArea from "@components/IPs/IPsTopArea";
import SearchLabels from "@components/IPs/SearchLabels";
import { handleFormDelete } from "@components/Lib/Alerts";
import MyTable from "@components/Lib/MyTable";
import Paginate from "@components/Lib/Paginate";
import { handleDelete } from "@utils/dbConnect";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";
import state from "@app/store";
import { useRouter } from "next/navigation";

export default function Show({ ip }) {
  const snap = useSnapshot(state);
  const router = useRouter();

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

  const editFunc = (e) => `/edit_ip/${e._id}`;

  const tableHeads = useMemo(
    () => [
      "No.",
      "IP",
      "Location",
      "device type",
      "Added By",
      "Created",
      "Updated",
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
      "createdAt",
      "updatedAt",
      "notes",
      "edit",
      "delete",
    ],
    []
  );
  // create delete Function
  const deleteFunc = useCallback(
    async (e) => {
      await handleFormDelete({
        handleDelete: () =>
          handleDelete({ api: `/api?id=${e._id}` }).then(() => {
            // filter out the deleted item
            state.ips = state.ips.filter((item) => item._id !== e._id);
            router.refresh();
            state.searchTerm = "";
          }),
      });
    },
    [router]
  );

  return (
    <>
      <IPsTopArea data={state.ips} path={'/add_ip'} title={'Add New IP'} />
      <SearchLabels />
      <MyTable
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
