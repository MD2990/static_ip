"use client";
import { post } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import {
	HStack,
	Separator,
	Button,
	VStack,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@lib/Fields";
import { deviceValidationSchema } from "@lib/yupValidationSchema";
import { addDevice } from "@server/devices/actions";
import { errorAlert, successAlert } from "@lib/Alerts";

export default function Add() {
	const router = useRouter();
	async function add(values) {
		try {
			await addDevice(values)
				.then(() => {
					successAlert("Device Added Successfully");
				})
				.catch((err) => {
					errorAlert(err.message);
				});
		} catch (error) {
			errorAlert(error.message);
		}
	}

	return (
		<VStack justify={"center"} minH="70vh">
			<Title title="Add Device" />

			<Formik
				initialValues={{
					device_type: "",
				}}
				onSubmit={async (values, actions) => {
					await add(values);
					actions.resetForm();
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

								<Separator borderColor={"gray.100"} />
								<FormBottomButton router={router} props={props} />
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</VStack>
	);
}
