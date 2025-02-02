"use client";
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Divider, VStack, Grid, GridItem } from "@chakra-ui/react";
import {
	CustomField,
	CustomTextArea,
	FormBottomButton,
	Title,
} from "@lib/Fields";
import { Form, Formik } from "formik";
import { ipValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete } from "@lib/Alerts";
import DropdownLists from "@app/(ips)/add_ip/DropdownLists";

export default function Edit({ data, devices, emp }) {
	const { location, device_type, added_by, _id, ip, notes } = data;
	const router = useRouter();

	async function put(values) {
		try {
			await handlePut({
				values,
				_id,
				api: "/edit_ip/api",
				field_name: values.ip,
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
				handleDelete({ id: _id });

				setTimeout(() => {
					router.back();
				}, 500);
			},
		});
	}

	return (
		<VStack m="2" p="2" justify={"center"}>
			<Title title={"Edit"} />
			<Formik
				initialValues={{
					location,
					device_type,
					added_by,
					ip,
					notes,
				}}
				onSubmit={async (values) => {
					await put(values);
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
								<GridItem>
									<CustomField fieldName="ip" labelName="IP" />
								</GridItem>
								<GridItem>
									<CustomField
										fieldName="location"
										labelName="Location/Office"
									/>
								</GridItem>

								<GridItem>
									<DropdownLists emp={emp} devices={devices} />
								</GridItem>

								<GridItem>
									<CustomTextArea fieldName="notes" labelName="Notes" />
								</GridItem>

								<Divider color="gray.100" />
								<FormBottomButton
									router={router}
									props={props}
									deleteBtn
									onDelete={onDelete}
								/>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</VStack>
	);
}
