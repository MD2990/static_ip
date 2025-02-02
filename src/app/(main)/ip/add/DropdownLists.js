import { CustomDropdown } from "@lib/Fields";

export default function DropdownLists({ emp, devices }) {
	return (
		<>
			<CustomDropdown
				fieldName="device_type"
				labelName="Device Type"
				arr={devices}
				keys={"device_type"}
			/>
			<CustomDropdown
				fieldName="added_by"
				labelName="Added By"
				arr={emp}
				keys={"employee_name"}
			/>
		</>
	);
}
