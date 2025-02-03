import { Flex, Stat, HStack } from "@chakra-ui/react";
import React from "react";
import { useSnapshot } from "valtio";
import { TopBtn } from "./BTNs";
import {
	FcBusinessman,
	FcHome,
	FcMultipleSmartphones,
	FcViewDetails,
} from "react-icons/fc";
import state from "@app/store";
import { usePathname, useRouter } from "next/navigation";
import printPdf from "@lib/print";
import Menus, { MenuItems } from "./Menus";
import { LuPlus, LuPrinter } from "react-icons/lu";

export default function TopArea({ data, path, title }) {
	const snap = useSnapshot(state);
	const pathname = usePathname();
	const router = useRouter();

	return (
		<HStack
			wrap={"wrap"}
			justify={"space-evenly"}
			direction={"row"}
			boxShadow={"lg"}
			p={["1", "2", "3", "4"]}
			rounded={"2xl"}
			spacing={[2, 3, 4, 8]}
			align="flex-end"
			mt="3%"
		>
			{pathname === "/" ? null : (
				<Flex align="flex-start">
					<TopBtn
						title="Home"
						onClick={() => router.push("/")}
						Icons={<FcHome />}
					/>
				</Flex>
			)}
			{data?.length ? (
				<Flex align="flex-start">
					<TopBtn
						title="Print"
						onClick={() => printPdf()}
						Icons={<LuPrinter />}
					/>
				</Flex>
			) : null}
			<Flex align="flex-start">
				<TopBtn
					title={title}
					onClick={() => router.push(path)}
					Icons={<LuPlus />}
				/>
			</Flex>

			<Menus title="Employees" total={state.empTotal}>
				<MenuItems text="Add" path="/emp/add" Icons={FcBusinessman} />
				<MenuItems text="Show" path="/emp/show" Icons={FcViewDetails} />
			</Menus>

			<Menus title="Devices" total={state.devicesTotal}>
				<MenuItems
					text="Add"
					path="devices/add"
					Icons={FcMultipleSmartphones}
				/>
				<MenuItems text="Show" path="/devices/show" Icons={FcViewDetails} />
			</Menus>
			<Flex align="flex-start" userSelect={"none"}>
				<Stat.Root>
					<Stat.Label
						color={"gray.500"}
						whiteSpace={"nowrap"}
						fontSize={[10, 15, 20]}
						fontWeight={"bold"}
					>
						{" "}
						Total:{" "}
						<Stat.ValueText
							textShadow="1.8px 0.1px  1px #add8d6"
							ml="2"
							as="span"
							color={"blue.500"}
							fontWeight="bold"
							fontSize={[10, 20, 25, 30]}
						>
							{snap.searchResults.length || 0}
						</Stat.ValueText>
					</Stat.Label>
				</Stat.Root>
			</Flex>
		</HStack>
	);
}
