import React from "react";
import {
	Center,
	Stack,
	Flex,
	Fieldset,
	Input,
	Textarea,
	Button,
	createListCollection,
} from "@chakra-ui/react";
import { Field as FormikField } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSave } from "react-icons/io5";
import { VscClearAll } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";
import { Field } from "@/components/ui/field";
import {
	NativeSelectField,
	NativeSelectRoot,
} from "@/components/ui/native-select";

import { FormControl, Spinner, Text, HStack, Box } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

import { FcPrint } from "react-icons/fc";
import { Skeleton, SkeletonCircle } from "@components/ui/skeleton";
import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from "@/components/ui/select";
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
	return (
		<HStack gap="5" justify={"center"} align={"center"} w="full" minH={"80dvh"}>
			<Stack flex="1" gap={"4"} justify={"center"} align={"center"}>
				<SkeletonCircle size="12" />
				<Skeleton height="5" width="50%" />
				<Skeleton height="5" width="50%" />
				<Skeleton height="5" width="50%" />
				<Skeleton height="5" width="50%" />
				<Skeleton height="5" width="50%" />
			</Stack>
		</HStack>
	);
}
const fontSize = ["md", "lg", "xl"];

export const CustomField = ({
	fieldName,
	labelName,
	type = "text",
	disabled = false,
}) => {
	return (
		<FormikField name={fieldName}>
			{({ field, meta }) => (
				<Fieldset.Root invalid={meta.touched && meta.error}>
					<Fieldset.Content>
						<Field label={labelName}>
							<Input
								disabled={disabled}
								{...field}
								id={fieldName}
								placeholder={labelName}
								size={["sm", "md", "lg"]}
								type={type}
								fontSize={fontSize}
							/>
						</Field>
					</Fieldset.Content>
					{meta.touched && meta.error && (
						<Fieldset.ErrorText>{meta.error}</Fieldset.ErrorText>
					)}
				</Fieldset.Root>
			)}
		</FormikField>
	);
};

export const CustomTextArea = ({ fieldName, labelName }) => {
	return (
		<FormikField name={fieldName}>
			{({ field, meta }) => (
				<Fieldset.Root invalid={meta.touched && meta.error}>
					<Fieldset.Content>
						<Field label={labelName}>
							<Textarea
								{...field}
								id={fieldName}
								placeholder={labelName}
								size={["sm", "md", "lg"]}
								fontSize={fontSize}
							/>
						</Field>
					</Fieldset.Content>
					{meta.touched && meta.error && (
						<Fieldset.ErrorText>{meta.error}</Fieldset.ErrorText>
					)}
				</Fieldset.Root>
			)}
		</FormikField>
	);
};

export const CustomDropdown = ({ fieldName, labelName, arr = [], keys }) => {
	return (
		<FormikField name={fieldName}>
			{({ field, meta, form }) => (
				<Field
					mt="2"
					label={labelName}
					invalid={meta.touched && meta.error}
					errorText={meta.touched && meta.error ? meta.error : undefined}
				>
					<NativeSelectRoot invalid={meta.touched && meta.error} {...field}>
						<NativeSelectField placeholder="Select option" {...field}>
							{arr.map((item, i) => (
								<option key={i} value={item[keys]}>
									{item[keys]}
								</option>
							))}
						</NativeSelectField>
					</NativeSelectRoot>
				</Field>
			)}
		</FormikField>
	);
};

export const DateField = () => {
	return (
		<Flex align="flex-start" minW={"50%"} maxW="50%">
			<FormikField name="added_date">
				{({ field, form }) => (
					<Fieldset.Root
						invalid={form.errors.added_date && form.touched.added_date}
					>
						<Fieldset.Content>
							<Field label="Added Date">
								<Input
									{...field}
									id="added_date"
									type="date"
									size="lg"
									fontSize={fontSize}
								/>
							</Field>
						</Fieldset.Content>
						{form.touched.added_date && form.errors.added_date && (
							<Fieldset.ErrorText>{form.errors.added_date}</Fieldset.ErrorText>
						)}
					</Fieldset.Root>
				)}
			</FormikField>
		</Flex>
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
				size={fontSize}
				variant="outline"
				colorPalette="blue"
				type="button"
				onClick={() => router.back()}
			>
				<IoMdArrowRoundBack />
				Back
			</Button>
			<Button
				size={fontSize}
				colorPalette="gray"
				variant="outline"
				type="button"
				onClick={props.handleReset}
			>
				<VscClearAll />
				Reset
			</Button>

			{deleteBtn && (
				<Button
					size={fontSize}
					colorPalette="red"
					variant="outline"
					type="button"
					onClick={onDelete}
					loading={props.isSubmitting}
				>
					<AiFillDelete /> Delete
				</Button>
			)}

			<Button
				size={fontSize}
				variant="outline"
				colorPalette="green"
				loading={props.isSubmitting}
				type="submit"
			>
				<IoSave /> Save
			</Button>
		</Stack>
	);
};

export const DropdownOptions = [
	{
		device_type: "Printer",
	},
	{
		device_type: "Scanner",
	},
	{
		device_type: "Computer",
	},
	{
		device_type: "Laptop",
	},
	{
		device_type: "Mobile",
	},
	{
		device_type: "Tablet",
	},
	{
		device_type: "Other",
	},
];

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
