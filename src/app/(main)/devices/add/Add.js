"use client";
import { post } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import {
	HStack,
	Divider,
	Button,
	VStack,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@lib/Fields";
import { deviceValidationSchema } from "@lib/yupValidationSchema";
import state from "@app/store";
import { useSnapshot } from "valtio";

export default function Add({ data }) {
	const router = useRouter();
	const snap = useSnapshot(state);
	async function add(values) {
		await post({ values, api: "/add_device/api", name: values.device_type });
	}

	useEffect(() => {
		state.deviceDefaultValue = "";
		return () => {
			state.deviceDefaultValue = "";
		};
	}, []);

	const devicesArray = [
		"Printer",
		"Switch",
		"Router",
		"Firewall",
		"Access Point",
		"Server",
		"Storage",
		"UPS",
		"Other",
	];

	const filteredDevices = (device) =>
		// return false if device is not in devices array
		// return true if device is in devices array
		data.some((d) => d.toLowerCase() === device.toLowerCase());

	return (
		<VStack minH="60vh" p="2" m="2" justify={"center"}>
			<Title title={"Add Device"} />

			<HStack
				wrap={"wrap"}
				spacing={4}
				justify={"center"}
				p="2"
				m="2"
				boxShadow={"lg"}
				borderWidth="1px"
				rounded={"sm"}
			>
				{devicesArray.map((device, i) => (
					<Button
						isDisabled={filteredDevices(device)}
						size={"sm"}
						key={i}
						variant="solid"
						colorScheme="telegram"
						onClick={() => {
							state.deviceDefaultValue = device;
						}}
					>
						{device}
					</Button>
				))}
			</HStack>

			<Formik
				initialValues={{
					device_type: snap.deviceDefaultValue,
				}}
				enableReinitialize={true}
				onSubmit={async (values, actions) => {
					await add(values);
					state.deviceDefaultValue = "";
					actions.resetForm();
					router.refresh();
				}}
				validationSchema={deviceValidationSchema}
			>
				{(props) => {
					return (
						<Form>
							<Grid
								boxShadow={"xl"}
								rounded={"xl"}
								p={[2, 3, 4]}
								templateColumns="repeat(1, 1fr)"
								gap={[1, 2, 3, 4]}
								borderTop={"1px solid lightGray "}
							>
								<GridItem>
									<CustomField
										fieldName="device_type"
										labelName="Device Name"
									/>
								</GridItem>

								<Divider borderColor={"gray.100"} />

								<FormBottomButton router={router} props={props} />
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</VStack>
	);
}
