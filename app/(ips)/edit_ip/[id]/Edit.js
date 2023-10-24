"use client";
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React from "react";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import {

  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "@components/Lib/Fields";
import { Form, Formik } from "formik";
import { ipValidationSchema } from "@lib/yupValidationSchema";
import { errorAlert, handleFormDelete } from "@components/Lib/Alerts";
import DropdownLists from "@app/(ips)/add_ip/DropdownLists";

export default function Edit({ data, devices, emp }) {
  const { location, device_type, added_by, _id, ip, notes } = data;
  const router = useRouter();

  async function put(values) {
    try {
      await handlePut({
        values,
        _id,
        api: "/edit_ip/api",
        field_name: values.ip,
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

                  <DropdownLists emp={emp} devices={devices} />


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
