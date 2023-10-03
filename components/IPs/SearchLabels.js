import {
  Button,
  Stack,
  Stat,
  StatLabel,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../app/store";
function SearchLabels() {
  const snap = useSnapshot(state);
  useEffect(() => {}, []);

  // create an array of multiple colors
  const colors = [
    "red.200",
    "green.200",
    "blue.200",
    "yellow.200",
    "orange.200",
    "purple.200",
    "teal.200",
    "gray.200",
  ];
  const unique = useCallback(
    () =>
      // eslint-disable-next-line no-undef
      [...new Set(state.ips.map((item) => item.device_type))],
    []
  );

  const labelColors = (colors, i, n) => {
    const color = `${colors[i % colors.length].substring(
      0,
      colors[i % colors.length].length - 3
    )}${n}`;
    return color;
  };

  if (!snap.searchResults.length) return null;

  return (
    <Stack
      ml="2%"
      position={"fixed"}
      left={"0"}
      top={["10rem", "22rem"]}
      bottom={"0"}
    >
      <Text
        userSelect={"none"}
        whiteSpace={"nowrap"}
        fontFamily={"serif"}
        fontSize={["sm", "md", "lg"]}
        fontWeight={"bold"}
        color={"blackAlpha.500"}
        textShadow={"0px 3px 2px lightGray"}
      >
        Filter by
      </Text>
      {unique().map((e, i) => {
        return (
          <WrapItem
            key={i}
            cursor={"pointer"}
            userSelect="none"
            _hover={{
              transition: "transform .7s ease-in-out",
              transform: "rotate(8deg)",
            }}
          >
            <Stat>
              <StatLabel
                textAlign={"center"}
                bg={colors[i % colors.length]}
                p={`${1.5}`}
                color={labelColors(colors, i, 600)}
                rounded={"md"}
                onClick={() => {
                  state.isDisabled = true;
                  state.searchTerm = e;
                }}
              >
                {e}{" "}
                <Text
                  textAlign={"center"}
                  color={labelColors(colors, i, 400)}
                  fontSize={[8, 10]}
                  fontWeight="black"
                  textShadow="0px 0px 6px white"
                >
                  {Math.round(
                    (state.ips.filter((item) => item.device_type === e).length /
                      state.ips.length) *
                      100
                  )}
                  %
                </Text>
              </StatLabel>
            </Stat>
          </WrapItem>
        );
      })}

      {snap.isDisabled && (
        <Button
          variant={"outline"}
          fontSize={["sm", "md", "lg", "xl"]}
          color="red.600"
          onClick={() => {
            //state.searchResults = state.ips;
            state.searchTerm = "";
            state.isDisabled = false;
          }}
        >
          ☓
        </Button>
      )}
    </Stack>
  );
}

export default React.memo(SearchLabels);
