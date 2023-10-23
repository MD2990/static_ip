"use client";
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@components/Lib/Fields";
import { Form, Formik } from "formik";
import { empValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete } from "@components/Lib/Alerts";

export default function EditEmp({ data }) {
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
        router.refresh();
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
        router.refresh();
        setTimeout(() => {
          router.back();
        }, 500);
      },
    });
  }

  return (
    <>
      <Center mt="3%">
        <Title title={"Edit Employee Details"} />
      </Center>
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
              <Center>
                <Wrap
                  shadow="lg"
                  maxW={"50%"}
                  minW={"8rem"}
                  justify="center"
                  borderWidth="1px"
                  borderRadius="lg"
                  m={[4, 6, 8, 10]}
                  spacing={[2, 3, 4, 6]}
                  p={[1, 2, 3, 4]}
                >
                  <CustomField
                    fieldName="employee_name"
                    labelName="Employee Name"
                  />{" "}
                  <Divider color="gray.100" />
                  <FormBottomButton
                    router={router}
                    props={props}
                    deleteBtn
                    onDelete={onDelete}
                  />
                </Wrap>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
