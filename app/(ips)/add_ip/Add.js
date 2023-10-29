"use client";
import React from "react";
import { Form, Formik } from "formik";
import { post } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { Divider, Wrap, Center } from "@chakra-ui/react";
import { ipValidationSchema } from "@lib/yupValidationSchema";
import {
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "@components/Lib/Fields";
import DropdownLists from "./DropdownLists";

export default function Add({ emp, devices }) {
  const router = useRouter();

  async function add(values) {
    await post({ values, api: "/add_ip/api", name: values.ip });
  }

  return (
    <>
      <Center mt="0.5%">
        <Title title={"Add New IP"} />
      </Center>
      <Formik
        initialValues={{
          ip: "",
          location: "",
          device_type: "Printer",
          added_by: "",
          notes: "No Notes",
        }}
        onSubmit={async (values) => {
          await add(values);
          router.refresh();
        }}
        validationSchema={ipValidationSchema}
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
                  <CustomField fieldName="ip" labelName="IP" />
                  <CustomField
                    fieldName="location"
                    labelName="Location/Office"
                  />

                  <DropdownLists devices={devices} emp={emp} />
                  <CustomTextArea fieldName="notes" labelName="Notes" />

                  <Divider color="gray.100" />

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
