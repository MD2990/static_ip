"use client";
import React from "react";
import { Form, Formik } from "formik";
import { post } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { Divider, VStack, Grid, GridItem } from "@chakra-ui/react";
import { ipValidationSchema } from "@lib/yupValidationSchema";
import {
	CustomField,
	CustomTextArea,
	FormBottomButton,
	Title,
} from "@lib/Fields";
import DropdownLists from "./DropdownLists";

export default function Add({ emp, devices }) {
	const router = useRouter();

	async function add(values) {
		await post({ values, api: "/add_ip/api", name: values.ip });
	}

	return (
		<VStack m="2" p="2" justify={"center"}>
			<Title title={"Add New IP"} />

			<Formik
				initialValues={{
					ip: "",
					location: "",
					device_type: "Printer",
					added_by: "",
					notes: "No Notes",
				}}
				onSubmit={async (values) => {
					await add(values);
					router.refresh();
				}}
				validationSchema={ipValidationSchema}
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
								<GridItem rowSpan={1}>
									<CustomField fieldName="ip" labelName="IP" />
								</GridItem>
								<GridItem rowSpan={1}>
									<CustomField
										fieldName="location"
										labelName="Location/Office"
									/>
								</GridItem>

								<DropdownLists devices={devices} emp={emp} />
								<CustomTextArea fieldName="notes" labelName="Notes" />

								<Divider color="gray.100" />
								<FormBottomButton router={router} props={props} />
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</VStack>
	);
}
