"use client";
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Divider, VStack, Grid, GridItem } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@components/Lib/Fields";
import { Form, Formik } from "formik";
import { empValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete } from "@components/Lib/Alerts";

export default function Edit({ data }) {
  const { employee_name, _id } = data;
  const router = useRouter();

  async function put(values) {
    try {
      await handlePut({
        values,
        _id,
        api: "/edit_emp/api",
        field_name: values.employee_name,
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
        handleDelete({ api: `/edit_emp/api?id=${_id}` });

        setTimeout(() => {
          router.refresh();
          router.back();
        }, 500);
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
          router.refresh();
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
