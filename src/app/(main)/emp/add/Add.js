"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Formik, Form } from "formik";
import { Separator, VStack, Grid, GridItem } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@lib/Fields";
import { empValidationSchema } from "@lib/yupValidationSchema";
import { addEmp } from "@server/emp/actions";
import { errorAlert, successAlert } from "@lib/Alerts";

export default function Add() {
	const router = useRouter();
	async function add(values) {
		try {
			await addEmp({ values })
				.then(() => {
					successAlert("Employee Added Successfully");
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
			<Title title={"Add Employee"} />

			<Formik
				initialValues={{
					employee_name: "",
				}}
				onSubmit={async (values, actions) => {
					await add(values);
					router.refresh();
					actions.resetForm();
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
