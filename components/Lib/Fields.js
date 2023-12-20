import React from "react";
import { Center, Box, Stack } from "@chakra-ui/layout";
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
    <Center>
      <Text
        textAlign="center"
        textOverflow="ellipsis"
        fontSize={["lg", "2xl", "5xl"]}
        fontFamily="fantasy"
        color={"gray.600"}
        letterSpacing="3.0px"
        textTransform="capitalize"
        fontWeight="hairline"
        textShadow={"0px 4px 10px gray"}
        px={4}
        userSelect="none"
        noOfLines={2}
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
const fontSize = ["sm", "md", "lg"];

export const CustomField = ({
  fieldName,
  labelName,
  type = "text",
  disabled = false,
}) => {
  return (
    <Field name={fieldName}>
      {({ field, meta }) => (
        <FC isInvalid={meta.touched && meta.error}>
          <FormLabel
            fontSize={fontSize}
            fontWeight="bold"
            htmlFor={fieldName}
            noOfLines={1}
          >
            {labelName}
          </FormLabel>
          <Input
            disabled={disabled}
            {...field}
            id={fieldName}
            placeholder={labelName}
            size={["sm", "md", "lg"]}
            type={type}
            fontSize={fontSize}
            noOfLines={1}
          />
          <FormErrorMessage noOfLines={1}>{meta.error}</FormErrorMessage>
        </FC>
      )}
    </Field>
  );
};
export const CustomTextArea = ({ fieldName, labelName }) => {
  return (
    <Field name={fieldName}>
      {({ field, meta }) => (
        <FC isInvalid={meta.touched && meta.error}>
          <FormLabel fontSize={fontSize} fontWeight="bold" htmlFor={fieldName}>
            {labelName}
          </FormLabel>
          <Textarea
            {...field}
            id={fieldName}
            placeholder={labelName}
            size={["sm", "md", "lg"]}
            fontSize={fontSize}
          />
        </FC>
      )}
    </Field>
  );
};

export const CustomDropdown = ({ fieldName, labelName, arr, keys, val }) => {
  if (val)
    arr = arr.filter((opt) => opt[keys].toLowerCase() !== val.toLowerCase());
  return (
    <Field name={fieldName}>
      {({ field, meta }) => (
        <FC isInvalid={meta.touched && meta.error}>
          <FormLabel fontSize={fontSize} fontWeight="bold" htmlFor={fieldName}>
            {labelName}
          </FormLabel>
          <Select
            fontSize={fontSize}
            {...field}
            id="fieldName"
            placeholder="Select"
            size={["sm", "md", "lg"]}
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
          <FormErrorMessage noOfLines={1}>{meta.error}</FormErrorMessage>
        </FC>
      )}
    </Field>
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
    <Stack spacing={[1, 2, 3, 4]} direction={{ base: "column", sm: "row" }}>
      <Button
        w="full"
        leftIcon={<IoMdArrowRoundBack />}
        size={fontSize}
        variant="outline"
        colorScheme="blue"
        type="button"
        onClick={() => router.back()}
      >
        Back
      </Button>

      <Button
        w="full"
        className="hvr-rectangle-out"
        leftIcon={<VscClearAll />}
        size={fontSize}
        colorScheme="gray"
        variant="outline"
        type="button"
        onClick={props.handleReset}
      >
        Reset
      </Button>

      {deleteBtn && (
        <Button
          w="full"
          size={fontSize}
          leftIcon={<AiFillDelete />}
          colorScheme="red"
          variant="outline"
          type="button"
          onClick={onDelete}
          isLoading={props.isSubmitting}
        >
          Delete
        </Button>
      )}

      <Button
        w="full"
        size={fontSize}
        className="hvr-rectangle-out"
        leftIcon={<IoSave />}
        variant="outline"
        colorScheme="whatsapp"
        isLoading={props.isSubmitting}
        type="submit"
      >
        Save
      </Button>
    </Stack>
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
    size={fontSize}
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
