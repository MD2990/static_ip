"use client";
import { post } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import {
  Wrap,
  Center,
  Divider,
  Button,
} from "@chakra-ui/react";
import { CustomField, FormBottomButton, Title } from "@components/Lib/Fields";
import { deviceValidationSchema } from "@lib/yupValidationSchema";
import state from "@app/store";
import { useSnapshot } from "valtio";

export default function Add({ data }) {
  const router = useRouter();

  const snap = useSnapshot(state);

  async function add(values) {
    await post({ values, api: "/add_device/api", name: values.device_type });
    router.refresh();
  }

  useEffect(() => {
    state.deviceDefaultValue = "";
    return () => {
      state.deviceDefaultValue = "";
    };
  }, []);

  const devicesArray = [
    "Printer",
    "Switch",
    "Router",
    "Firewall",
    "Access Point",
    "Server",
    "Storage",
    "UPS",
    "Other",
  ];

  const filteredDevices = devicesArray.filter((device) =>
    data.map((item) => item.toLowerCase()).includes(device.toLowerCase())
  );
  return (
    <>
      <Center mt="15%">
        <Title title={"Add Device"} />
      </Center>
      {
        <Wrap
          spacing={4}
          justify={"center"}
          p="2"
          m="2"
          boxShadow={"lg"}
          borderWidth="1px"
          rounded={"sm"}
        >
          {devicesArray.map((device, i) => (
            <Button
              isDisabled={filteredDevices.includes(device)}
              size={"sm"}
              key={i}
              variant="solid"
              colorScheme="telegram"
              onClick={() => {
                state.deviceDefaultValue = device;
              }}
            >
              {device}
            </Button>
          ))}
        </Wrap>
      }
      <Formik
        initialValues={{
          device_type: snap.deviceDefaultValue,
        }}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          await add(values);
          router.refresh();
          state.deviceDefaultValue = "";
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
                  <CustomField
                    fieldName="device_type"
                    labelName="Device Name"
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
