import { Stat, StatLabel, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import SearchInput from "../Lib/SearchInput";
import { toPDF } from "../../utils/dbConnect";
import { useSnapshot } from "valtio";
import { TopBtn } from "../Lib/BTNs";
import { substring } from "../../lib/helpers";
import {
  FcBusinessman,
  FcMultipleSmartphones,
  FcPlus,
  FcPrint,
  FcViewDetails,
} from "react-icons/fc";
import state from "@app/store";
import { useRouter } from "next/navigation";
import Menus, { MenuItems } from "./Menus";

export default function IPsTopArea({data, path , title}) {
  const snap = useSnapshot(state);

  const router = useRouter();
  function printPdf() {
    const rows = state.searchResults.map(
      (
        { ip, location, device_type, added_by, createdAt, updatedAt, notes },
        index
      ) => {
        index += 1;
        const data = {
          ip,
          location,
          device_type,
          added_by,
          createdAt,
          updatedAt,
          notes,
          index,
        };

        return data;
      }
    );

    const columns = [
      { title: "No.", key: "index" },
      { title: "IP", key: "ip" },
      { title: "Location", key: "location" },
      { title: "Device Type", key: "device_type" },
      { title: "Added By", key: "added_by" },
      { title: "Added", key: "createdAt" },
      { title: "Updated", key: "updatedAt" },
      { title: "Notes", key: "notes" },
    ];

    return toPDF({
      rows,
      columns,
      style: "l",
      title: state.searchTerm.trim()
        ? `\t\t\t\t\t\t IPs related to:  ${substring(state.searchTerm, 20)} `
        : "\t\t\t\t\t\t  List of All Static IPs",
      leftTitle: `Total IPs: ${state.searchResults.length}`,
    });
  }

  return (
    <Wrap
      justify={"space-around"}
      direction={"row"}
      boxShadow={"lg"}
      p={["1", "2", "3", "4"]}
      rounded={"2xl"}
      spacing={[2, 3, 4, 8]}
      align="flex-end"
      mt="10%"
    >
      {snap.searchResults.length ? (
        <WrapItem>
          <TopBtn title="Print" onClick={printPdf} Icons={<FcPrint />} />
        </WrapItem>
      ) : null}{" "}
      <WrapItem>
        <SearchInput searchData={data} />
      </WrapItem>
      <WrapItem>
        <TopBtn
          title={title}
          onClick={() => router.push(path)}
          Icons={<FcPlus />}
        />
      </WrapItem>
      <Menus title="Employees">
        <MenuItems text="Add" path="/add_emp" Icons={FcBusinessman} />
        <MenuItems text="Show" path="/show_emp" Icons={FcViewDetails} />
      </Menus>
      <Menus title="Devices">
        <MenuItems text="Add" path="/device" Icons={FcMultipleSmartphones} />
        <MenuItems text="Show" path="/show_device" Icons={FcViewDetails} />
      </Menus>
      <WrapItem align="center" userSelect={"none"}>
        <Stat>
          <StatLabel
            color={"gray.400"}
            whiteSpace={"nowrap"}
            fontSize={[3, 5, 10, 15]}
          >
            {" "}
            Total:{" "}
            <Text
              textShadow="1.8px 0.1px  1px #add8d6"
              ml="2"
              as="span"
              color={"blue.500"}
              fontWeight="bold"
              fontSize={[10, 20, 25, 30]}
            >
              {snap.searchResults.length || 0}
            </Text>
          </StatLabel>
        </Stat>
      </WrapItem>
    </Wrap>
  );
}
