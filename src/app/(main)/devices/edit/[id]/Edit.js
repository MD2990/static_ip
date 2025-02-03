"use client";
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Divider, VStack, Grid, GridItem } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@lib/Fields";
import { Form, Formik } from "formik";
import { deviceValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete } from "@lib/Alerts";

export default function Edit({ data }) {
	const { device_type, _id } = data;
	const router = useRouter();

	async function put(values) {
		try {
			await handlePut({
				values,
				_id,
				api: "/edit_device/api",
				field_name: values.device_type,
			}).then(() => {
				setTimeout(() => {
					router.back();
				}, 500);
			});
		} catch (error) {
			errorAlert(error.message);
		}
	}
	async function onDelete() {
		await handleFormDelete({
			handleDelete: () => {
				handleDelete({ api: `/edit_device/api?id=${_id}` });

				setTimeout(() => {
					router.refresh();
					router.back();
				}, 500);
			},
		});
	}

	return (
		<VStack minH="70vh" p="2" m="2" justify={"center"}>
			<Title title={"Edit Device Details"} />

			<Formik
				initialValues={{
					device_type,
				}}
				onSubmit={async (values) => {
					await put(values);
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
										labelName="Device Type"
									/>
								</GridItem>
								<Divider color="gray.100" />
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
