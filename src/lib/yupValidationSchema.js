import * as Yup from "yup";
const ipAddressSchema = Yup.string()
	.trim()
	.required("IP is Required")
	.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
		message: "Invalid IP address",
		excludeEmptyString: true,
	})
	.test(
		"ipAddress",
		"IP address value should be less or equal to 255",
		(value) => {
			if (value === undefined || value.trim() === "") return true;
			return value.split(".").find((i) => parseInt(i) > 255) === undefined;
		}
	);
export const ipValidationSchema = Yup.object().shape({
	location: Yup.string().trim().required(" Location is required"),
	device_type: Yup.string().trim().required("Device Type is required"),
	added_by: Yup.string().required("Added By is Required"),
	ip: ipAddressSchema,
});
export const empValidationSchema = Yup.object().shape({
	employee_name: Yup.string()
		.trim()
		.required("Employee Name is required")
		.min(3, "Name must be at least 3 characters")
		.max(30, "Name must not exceed 30 characters"),

	// min 3 char, max 20 char
});

export const deviceValidationSchema = Yup.object().shape({
	device_type: Yup.string()
		.trim()
		.required("Device Name is required")
		.min(3, "Device Name must be at least 3 characters")
		.max(20, "Device Name must not exceed 20 characters"),

	// min 3 char, max 20 char
});
