"use client";
import { post } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Formik, Form } from "formik";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@components/Lib/Fields";
import { empValidationSchema } from "@lib/yupValidationSchema";

export default function Add() {
  const router = useRouter();

  async function add(values) {
    await post({ values, api: "/add_emp/api", name: values.employee_name });
  }

  return (
    <>
      <Center mt="0.5%">
        <Title title={"Add Employee"} />
      </Center>
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
              <Center>
                <Wrap
                  shadow="lg"
                  maxW={"45%"}
                  minW={"35%"}
                  justify="center"
                  borderWidth="1px"
                  borderRadius="lg"
                  m={[4, 6, 8]}
                  spacing={[2, 3, 4, 6]}
                  p={[1, 2, 3, 4]}
                >
                  <CustomField
                    fieldName="employee_name"
                    labelName="Employee Name"
                  />

                  <Divider borderColor={"gray.100"} />

                  <FormBottomButton router={router} props={props} />
                </Wrap>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
