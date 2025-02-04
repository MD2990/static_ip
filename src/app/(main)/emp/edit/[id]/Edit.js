"use client";
import { handleDelete } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Separator, VStack, Grid, GridItem } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@lib/Fields";
import { Form, Formik } from "formik";
import { empValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete, successAlert } from "@lib/Alerts";
import { deleteEmp, updateEmp } from "@server/emp/actions";

export default function Edit({ emp }) {
	const { employee_name, _id } = emp;
	const router = useRouter();

	async function put(values) {
		try {
			await updateEmp({
				values,
				_id,
			});
			successAlert("Employee details updated successfully");
			router.back();
		} catch (error) {
			errorAlert(error.message);
		}
	}
	async function onDelete() {
		await handleFormDelete({
			handleDelete: async () => {
				try {
					await deleteEmp({ _id });
					successAlert("Employee details deleted successfully");
					router.back();
				} catch (error) {
					errorAlert(error.message);
				}
			},
		});
	}

	return (
		<VStack m="2" p="2" minH="70vh" justify={"center"}>
			<Title title={"Edit Employee Details"} />

			<Formik
				initialValues={{
					employee_name,
				}}
				onSubmit={async (values) => {
					await put(values);
				}}
				validationSchema={empValidationSchema}
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
										fieldName="employee_name"
										labelName="Employee Name"
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
