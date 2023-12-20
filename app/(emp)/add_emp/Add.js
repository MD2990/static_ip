"use client";
import { post } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Formik, Form } from "formik";
import { Divider, VStack, Grid, GridItem } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@components/Lib/Fields";
import { empValidationSchema } from "@lib/yupValidationSchema";

export default function Add() {
  const router = useRouter();

  async function add(values) {
    await post({ values, api: "/add_emp/api", name: values.employee_name });
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
