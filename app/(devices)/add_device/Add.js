"use client";
import { post } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Formik, Form } from "formik";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@components/Lib/Fields";
import { deviceValidationSchema } from "@lib/yupValidationSchema";

export default function Add() {
  const router = useRouter();

  async function add(values) {
    await post({ values, api: "/add_device/api", name: values.device_type });
    router.refresh();
  }

  return (
    <>
      <Center mt="0.5%">
        <Title title={"Add Device"} />
      </Center>
      <Formik
        initialValues={{
          device_type: "",
        }}
        onSubmit={async (values, actions) => {
          await add(values);
          actions.resetForm();
        }}
        validationSchema={deviceValidationSchema}
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
                  <CustomField fieldName="device_type" labelName="Device Name" />

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
