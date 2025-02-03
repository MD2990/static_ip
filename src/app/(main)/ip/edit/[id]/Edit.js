"use client";
import { handleDelete } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { VStack, Grid, GridItem, Separator } from "@chakra-ui/react";
import {
	CustomDropdown,
	CustomField,
	CustomTextArea,
	FormBottomButton,
	Title,
} from "@lib/Fields";
import { Form, Formik } from "formik";
import { ipValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete, successAlert } from "@lib/Alerts";
import DropdownLists from "../../add/DropdownLists";
import { deleteIP, updateIP } from "@server/ip/actions";

export default function Edit({ data, devices, emp }) {
	const { location, device_type, added_by, _id, ip, notes } = data;
	const router = useRouter();
	async function put(values) {
		try {
			await updateIP({ values, _id });
			successAlert("IP Details Updated Successfully");
			router.back();
		} catch (error) {
			errorAlert(error.message);
		}
	}
	async function onDelete() {
		await handleFormDelete({
			handleDelete: async () => {
				await deleteIP({ id: _id });
				successAlert("IP Deleted Successfully");
				router.back();
			},
		});
	}

	return (
		<VStack m="2" p="2" justify={"center"} align={"center"} minH={"80dvh"}>
			<Title title={`Edit: ${ip}`} />
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

								<GridItem>
									<CustomTextArea fieldName="notes" labelName="Notes" />
								</GridItem>

								<Separator color="gray.100" mt="5" />
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
