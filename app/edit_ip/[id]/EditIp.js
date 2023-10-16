"use client";
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import {
  CustomDropdown,
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "@components/Lib/Fields";
import { Form, Formik } from "formik";
import { empValidationSchema } from "@lib/yupValidationSchema";
import { deviceTypeOptions } from "@components/Lib/const";
import { errorAlert, handleFormDelete } from "@components/Lib/Alerts";

export default function EditIp({ data }) {
  const { location, device_type, added_by, _id, ip, added_date, notes } = data;
  const router = useRouter();

  async function put(values) {
    try {
      await handlePut({ values, _id, api: "/edit_ip/api" }).then(() => {
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
        handleDelete({ id: _id });
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
        <Title title={"Edit"} />
      </Center>
      <Formik
        initialValues={{
          location,
          device_type,
          added_by,

          ip,
          added_date,
          notes,
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
                  <CustomField fieldName="ip" labelName="IP" />
                  <CustomField
                    fieldName="location"
                    labelName="Location/Office"
                  />
                  <CustomDropdown
                    fieldName="device_type"
                    labelName="Device Type"
                    val={device_type}
                    arr={deviceTypeOptions}
                    keys={"b"}
                  />
                  <CustomField fieldName="added_by" labelName="Added By" />

                  <CustomTextArea fieldName="notes" labelName="Notes" />

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
