"use client";
import { handleFormDelete } from "@components/Lib/Alerts";
import { handleDelete } from "@utils/dbConnect";
import React, { useCallback, useEffect } from "react";
import state from "@app/store";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import TopArea from "@components/Lib/TopArea";
import { Cards } from "../../../components/Lib/Cards";
import PageTitle from "@components/Lib/PageTitle";
import { setLocalStorage } from "@lib/helpers";
import { useRouter } from "next/navigation";

export default function Show({ device }) {
  const snap = useSnapshot(state);

  const router = useRouter();

  useEffect(() => {
    state.title = "Device List";
    state.device = device;
    state.searchTerm = "";

    if (typeof window !== "undefined") {
      setLocalStorage({ key: "devicesTotal", obj: device.length });
    }
    return () => {
      state.searchTerm = "";
      state.device = [];
      state.title = "";
    };
  }, [device]);

  const rs = useCallback(() => {
    // eslint-disable-next-line valtio/state-snapshot-rule
    return snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE);
  }, [snap.PER_PAGE, snap.offset, snap.searchResults]);

  // create delete Function
  const deleteFunc = useCallback(
    async (e) => {
      await handleFormDelete({
        handleDelete: () =>
          handleDelete({ api: `/edit_device/api?id=${e._id}` }).then(() => {
            state.searchResults = state.searchResults.filter(
              (p) => p._id !== e._id
            );

            router.refresh();
            state.device = state.device.filter((p) => p._id !== e._id);
            state.searchTerm = "";

            state.devicesTotal = state.device.length;
          }),
      });
    },
    [router]
  );

  return (
    <>
      <TopArea
        data={snap.device}
        path={"/add_device"}
        title={"Add New Device"}
      />

      <PageTitle />
      {snap.device.length === 0 ? (
        <Heading
          size={["sm", "md", "lg", "2xl"]}
          align="center"
          mt="10%"
          noOfLines={1}
          color={"gray.500"}
          fontFamily={'"Times New Roman", Times, serif'}
        >
          No Device Added Yet ...
        </Heading>
      ) : (
        <SimpleGrid
          m="2"
          p="2"
          spacing={1}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          <Cards
            data={rs()}
            deleteFunc={deleteFunc}
            fieldName={"device_type"}
            editPath={"edit_device"}
          />
        </SimpleGrid>
      )}
    </>
  );
}
