"use client";
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@components/Lib/Fields";
import { Form, Formik } from "formik";
import { deviceValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete } from "@components/Lib/Alerts";

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
    <>
      <Center mt="3%">
        <Title title={"Edit Device Details"} />
      </Center>
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
                    fieldName="device_type"
                    labelName="Device Type"
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
