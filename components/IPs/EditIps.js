import React from "react";
import { Form, Formik } from "formik";
import { handleDelete, handlePut } from "../../utils/dbConnect";
import { useRouter } from "next/router";
import { Divider, Wrap, Center } from "@chakra-ui/react";
import { empValidationSchema } from "../../lib/yupValidationSchema";
import {
  CustomDropdown,
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "../Lib/Fields";
import { handleFormDelete } from "../Lib/Alerts";
import { deviceTypeOptions } from "../Lib/const";

export default function EditIps({ ips }) {
  const { location, device_type, added_by, _id, ip, added_date, notes } = ips;

  const router = useRouter();

  async function put(values) {
    await handlePut({ values, api: "ips", router });
  }
  async function onDelete() {
    await handleFormDelete({
      handleDelete: () => handleDelete({ api: "ips", id: _id }),
      router: router,
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
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false);
          await put(values);
          router.back();
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
