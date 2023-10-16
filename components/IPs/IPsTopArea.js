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
} from "react-icons/fc";
import state from "@app/store";
import { useRouter } from "next/navigation";

export default function IPsTopArea() {
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
        <SearchInput searchData={state.ips} />
      </WrapItem>
      <WrapItem>
        <TopBtn
          title="Add IP"
          onClick={() => router.push("/add_ip")}
          Icons={<FcPlus />}
        />
      </WrapItem>
      <WrapItem>
        <TopBtn
          title="Add Employee"
          onClick={() => router.push("/add_emp")}
          Icons={<FcBusinessman />}
        />
      </WrapItem>
      <WrapItem>
        <TopBtn
          title="Add Device Type"
          onClick={() => router.push("/add_device_type")}
          Icons={<FcMultipleSmartphones />}
        />
      </WrapItem>
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
