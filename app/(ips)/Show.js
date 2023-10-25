"use client";
import SearchLabels from "@components/Lib/SearchLabels";
import { handleFormDelete } from "@components/Lib/Alerts";
import MyTable from "@components/Lib/MyTable";
import Paginate from "@components/Lib/Paginate";
import { handleDelete } from "@utils/dbConnect";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";
import state from "@app/store";
import { useRouter } from "next/navigation";
import TopArea from "@components/Lib/TopArea";
import { setLocalStorage } from "@lib/helpers";

export default function Show({ ip, devices, empTotal, devicesTotal }) {
  const snap = useSnapshot(state);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStorage({ key: "empTotal", obj: empTotal });
      setLocalStorage({ key: "devicesTotal", obj: devicesTotal });
    }
    state.ips = ip;
    state.searchTerm = "";
    state.title = "Static IPs";
    return () => {
      state.searchTerm = "";
      state.isDisabled = false;
      state.ips = [];
      state.title = "";
    };
  }, [devicesTotal, empTotal, ip]);

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

            state.searchTerm = "";
            router.refresh();
          }),
      });
    },
    [router]
  );

  return (
    <>
      <TopArea data={state.ips} path={"/add_ip"} title={"Add New IP"}></TopArea>
      <SearchLabels devices={devices} />

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
