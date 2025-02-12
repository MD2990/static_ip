"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Separator, VStack, Grid, GridItem } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@lib/Fields";
import { Form, Formik } from "formik";
import { deviceValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete, successAlert } from "@lib/Alerts";
import { deleteDevice, updateDevice } from "@server/devices/actions";

export default function Edit({ device }) {
	const { device_type, _id } = device;
	const router = useRouter();
	async function put(values) {
		try {
			const { success, error, message } = await updateDevice({
				values,
				_id,
			});
			if (!success || error) {
				errorAlert(error);
				return;
			}
			successAlert(message);
			router.back();
		} catch (error) {
			errorAlert(error.message);
		}
	}
	async function onDelete() {
		await handleFormDelete({
			handleDelete: async () => {
				try {
					const { success, error, message } = await deleteDevice({ _id });
					if (!success || error) {
						errorAlert(error);
						return;
					}
					successAlert(message);
					router.back();
				} catch (error) {
					errorAlert(error.message);
				}
			},
		});
	}

	return (
		<VStack m="2" p="2" minH="70vh" justify={"center"}>
			<Title title={"Edit Device"} />

			<Formik
				initialValues={{
					device_type,
				}}
				onSubmit={async (values) => {
					await put(values);
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
										labelName="Device Type"
									/>
								</GridItem>

								<Separator color="gray.100" />

								<GridItem>
									<FormBottomButton
										router={router}
										props={props}
										deleteBtn
										onDelete={onDelete}
									/>
								</GridItem>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</VStack>
	);
}
