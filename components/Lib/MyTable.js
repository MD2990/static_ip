import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSnapshot } from "valtio";
import state from "@app/store";

function MyTable({
  size = "sm",
  data,
  tableTitle,
  deleteFunc,
  tableHeads,
  tableRows,
  editFunc,
}) {
  const TheTable = () => {
    const snap = useSnapshot(state);

    return (
      <>
        <Thead bg="gray.50">
          <Tr>
            {tableHeads.map((e, i) => {
              // to avoid showing and applying the sort order on the Non-sortable columns
              const All_Keys = Object?.keys(data[0] || []).filter(
                (d) =>
                  d.toLowerCase() ===
                  e.toString().toLowerCase().split(" ").sort().join("_")
              );
              return (
                <Th
                  textAlign="left"
                  p={0.5}
                  userSelect={"none"}
                  key={i}
                  onClick={() => {
                    // get all keys from data and filter them as user clicks on the table headers

                    state.des = !state.des;

                    state.sortKey = All_Keys[0] || null;

                    {
                      if (state.sortKey && tableRows[i] === state.sortKey) {
                        return state.searchResults.sort((a, b) => {
                          if (state.des)
                            return a[state.sortKey].localeCompare(
                              b[state.sortKey]
                            ) < b[state.sortKey].localeCompare(a[state.sortKey])
                              ? -1
                              : 1;
                          else
                            return a[state.sortKey].localeCompare(
                              b[state.sortKey]
                            ) > b[state.sortKey].localeCompare(a[state.sortKey])
                              ? -1
                              : 1;
                        });
                      }
                      return 0;
                    }
                  }}
                >
                  {e}
                  {""}
                  {tableRows[i] === state.sortKey ? (
                    <Text
                      as="span"
                      fontSize={["sm", "md", "lg", "xl"]}
                      color="teal.400"
                    >
                      {snap.des ? `↑` : `↓`}
                    </Text>
                  ) : null}
                </Th>
              );
            })}
          </Tr>
        </Thead>

        <Tbody fontSize={["sm", "md", "lg"]}>
          {data?.map((t, index) => {
            return (
              <Tr key={t._id}>
                {tableRows.map((e, i) => (
                  <Td
                    p={0.7}
                    px={[1, 2]}
                    key={i}
                    textOverflow={"ellipsis"}
                    whiteSpace="nowrap"
                    overflow={"hidden"}
                    maxW="25rem"
                  >
                    {/* add No field to the table if the field is 0 (NO. field) */}
                    {i === 0 && snap.currentPage * snap.PER_PAGE + index + 1}
                    {t[e]}
                    {e === "edit" && (
                      <Link href={editFunc(t)}>
                        <IconButton
                          _focus={{ boxShadow: "none", outline: "none" }}
                          aria-label="Edit"
                          icon={<EditIcon />}
                          variant="unstyled"
                          color={"gray.400"}
                          fontSize={["xl", "2xl"]}
                        />
                      </Link>
                    )}
                    {e === "delete" && (
                      <IconButton
                        _focus={{ boxShadow: "none", outline: "none" }}
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() => deleteFunc(t)}
                        variant="unstyled"
                        color="red.400"
                        fontSize={["xl", "2xl"]}
                      />
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </>
    );
  };

  return (
    <TableContainer m={2}>
      <Table variant="striped" colorScheme="telegram" size={size}>
        <TableCaption
          userSelect={"none"}
          placement="top"
          fontSize={["xl", "2xl", "3xl", "5xl"]}
          textDecoration="underline"
          textShadow={`0px 0px 10px #d0d9d2`}
        >
          <Text
            as={"span"}
            textDecoration="underline"
            fontSize={["2xl", "4xl", "5xl"]}
          >
            {tableTitle}
          </Text>
        </TableCaption>

        <TheTable />
      </Table>
    </TableContainer>
  );
}

export default MyTable;
