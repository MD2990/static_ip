import React from "react";
import { Center, Box } from "@chakra-ui/layout";
import { Field } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSave } from "react-icons/io5";
import { VscClearAll } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";

import {
  FormControl as FC,
  Select,
  Textarea,
  WrapItem,
} from "@chakra-ui/react";

import {
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

import { FcPrint } from "react-icons/fc";

export function Title({ title, children }) {
  return (
    <Center mt="3%">
      <Text
        style={{ textShadow: "0px 2px 10px white" }}
        textAlign="center"
        textOverflow="ellipsis"
        fontSize={["sm", "lg", "2xl", "5xl"]}
        fontFamily="initial"
        color={"gray.600"}
        fontWeight={"black"}
        letterSpacing="1.0px"
        textTransform="capitalize"
        borderTopRadius="3xl"
        userSelect="none"
        bgGradient="linear(to-t, white,gray.200)"
        px={4}
      >
        {title}
      </Text>
      {children}
    </Center>
  );
}

export function PrintBtn({ click, size = "lg", colorScheme = "green" }) {
  return (
    <>
      <Button
        variant="outline"
        size={size}
        leftIcon={<FcPrint />}
        className="hvr-grow"
        onClick={() => click()}
        colorScheme={colorScheme}
      >
        Print
      </Button>
    </>
  );
}

export function Spans() {
  return (
    <Center mt={200}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    </Center>
  );
}

export function MySkeletons() {
  const Skeletons = () => (
    <Box padding="4" boxShadow="lg" bg="white" borderRadius="2xl">
      <Skeleton
        height="20px"
        startColor="green.50"
        endColor="blue.300"
        borderRadius="2xl"
        mb="2"
      />
      <SkeletonCircle
        size="12"
        startColor="green.50"
        endColor="blue.300"
        w="44"
        ml="8"
      />
      <SkeletonText
        startColor="green.50"
        endColor="blue.300"
        mt="4"
        noOfLines={6}
        spacing="6"
        h="15rem"
        w="15rem"
      />
    </Box>
  );
  return (
    <Wrap
      justify="center"
      textAlign="center"
      spacing={[1, 2, 3, 4]}
      mt={["5%", "6%", "7%", "8%"]}
    >
      <Skeletons />
      <Skeletons />
      <Skeletons />
    </Wrap>
  );
}
const fontSize = ["xs", "sm", "md", "lg"];
const btnPadding = ["1", "2", "4", "6"];

export const CustomField = ({
  fieldName,
  labelName,
  type = "text",
  disabled = false,
}) => {
  return (
    <WrapItem minW={"50%"} maxW="50%">
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FC isInvalid={meta.touched && meta.error}>
            <FormLabel
              fontSize={fontSize}
              fontWeight="bold"
              htmlFor={fieldName}
            >
              {labelName}
            </FormLabel>
            <Input
              disabled={disabled}
              {...field}
              id={fieldName}
              placeholder={labelName}
              size="lg"
              type={type}
              fontSize={fontSize}
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FC>
        )}
      </Field>
    </WrapItem>
  );
};
export const CustomTextArea = ({ fieldName, labelName }) => {
  return (
    <WrapItem minW={"50%"} maxW="50%">
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FC isInvalid={meta.touched && meta.error}>
            <FormLabel
              fontSize={fontSize}
              fontWeight="bold"
              htmlFor={fieldName}
            >
              {labelName}
            </FormLabel>
            <Textarea
              maxLength={300}
              {...field}
              id={fieldName}
              placeholder={labelName + " max 300 characters"}
              size="lg"
              fontSize={fontSize}
            />
          </FC>
        )}
      </Field>
    </WrapItem>
  );
};

export const CustomDropdown = ({ fieldName, labelName, arr, keys, val }) => {
  if (val)
    arr = arr.filter((opt) => opt[keys].toLowerCase() !== val.toLowerCase());
  return (
    <WrapItem minW={"50%"} maxW="50%">
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FC isInvalid={meta.touched && meta.error}>
            <FormLabel
              fontSize={fontSize}
              fontWeight="bold"
              htmlFor={fieldName}
            >
              {labelName}
            </FormLabel>
            <Select
              fontSize={fontSize}
              {...field}
              id="fieldName"
              placeholder="Select"
              size="lg"
            >
              {val && (
                /*    disabled because if the option is deleted or removed from the list the user should not reselect it */
                <option key={val} value={val} disabled>
                  {val}
                </option>
              )}
              {/*  applying a filter to remove duplicate selected item  */}
              {arr.map((c, index) => (
                <option key={c._id || index} value={c[keys]}>
                  {c[keys]}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FC>
        )}
      </Field>
    </WrapItem>
  );
};

export const DateField = () => {
  return (
    <WrapItem minW={"50%"} maxW="50%">
      <Field name="added_date">
        {({ field, form }) => (
          <FC isInvalid={form.errors.added_date && form.touched.added_date}>
            <FormLabel
              fontSize={fontSize}
              fontWeight="bold"
              htmlFor="added_date"
            >
              Added Date
            </FormLabel>
            <Input
              {...field}
              id="added_date"
              type="date"
              size="lg"
              fontSize={fontSize}
            />
            <FormErrorMessage>{form.errors.added_date}</FormErrorMessage>
          </FC>
        )}
      </Field>
    </WrapItem>
  );
};

export const FormBottomButton = ({
  router,
  props,
  deleteBtn = false,
  onDelete,
}) => {
  return (
    <Wrap justify="center">
      <WrapItem>
        <Button
          className="hvr-rectangle-out"
          leftIcon={<IoMdArrowRoundBack />}
          p={btnPadding}
          variant="outline"
          colorScheme="blue"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </WrapItem>
      <WrapItem>
        <Button
          className="hvr-rectangle-out"
          leftIcon={<VscClearAll />}
          p={btnPadding}
          fontSize={fontSize}
          colorScheme="gray"
          variant="outline"
          type="button"
          onClick={props.handleReset}
          disabled={!props.dirty}
        >
          Reset
        </Button>
      </WrapItem>

      {deleteBtn && (
        <WrapItem>
          <Button
            fontSize={fontSize}
            className="hvr-rectangle-out"
            leftIcon={<AiFillDelete />}
            p={btnPadding}
            colorScheme="red"
            variant="outline"
            type="button"
            onClick={onDelete}
            isLoading={props.isSubmitting}
          >
            Delete
          </Button>
        </WrapItem>
      )}
      <WrapItem>
        <Button
          fontSize={fontSize}
          className="hvr-rectangle-out"
          leftIcon={<IoSave />}
          p={btnPadding}
          variant="outline"
          colorScheme="whatsapp"
          isLoading={props.isSubmitting}
          type="submit"
        >
          Save
        </Button>
      </WrapItem>
    </Wrap>
  );
};

export const DropdownOptions = () => {
  return (
    <>
      <option value="SWITCH">SWITCH</option>
      <option value="FIREWALL">FIREWALL</option>
      <option value="SERVER">SERVER</option>
      <option value="OTHER">OTHER</option>
    </>
  );
};

export const BackBtn = ({ router }) => (
  <Button
    color="blue.500"
    colorScheme="gray"
    size="md"
    leftIcon={
      <BiArrowBack w="1.5rem" h="1.5rem" className="hvr hvr-backward" />
    }
    className="hvr-backward"
    onClick={() => router.back()}
    variant="solid"
    fontSize={["xs", "sm", "md", "lg"]}
  >
    Back
  </Button>
);
