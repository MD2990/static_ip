"use client";
import React from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { VStack, Grid, GridItem, Separator } from "@chakra-ui/react";
import { ipValidationSchema } from "@lib/yupValidationSchema";
import {
	CustomDropdown,
	CustomField,
	CustomTextArea,
	FormBottomButton,
	Title,
} from "@lib/Fields";
import { addIP } from "@server/ip/actions";
import { errorAlert, successAlert } from "@lib/Alerts";

export default function Add({ emp, devices }) {
	const router = useRouter();
	async function add(values) {
		try {
			await addIP(values)
				.then(() => {
					successAlert("IP Added Successfully");
				})
				.catch((err) => {
					errorAlert(err.message);
				});
		} catch (error) {
			errorAlert(error.message);
		}
	}

	return (
		<VStack m="2" p="2" justify={"center"}>
			<Title title={"Add New IP"} />

			<Formik
				initialValues={{
					ip: "",
					location: "",
					device_type: "",
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

								<GridItem>
									<CustomDropdown
										fieldName="device_type"
										labelName="Device Type"
										arr={devices}
										keys={"device_type"}
									/>
								</GridItem>
								<GridItem>
									<CustomDropdown
										fieldName="added_by"
										labelName="Added By"
										arr={emp}
										keys={"employee_name"}
									/>
								</GridItem>
								<CustomTextArea fieldName="notes" labelName="Notes" />

								<Separator color="gray.100" mt="5" />
								<FormBottomButton router={router} props={props} />
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</VStack>
	);
}
