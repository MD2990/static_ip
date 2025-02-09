import { getEmpAndDevicesList } from "@server/ip/actions";
import Add from "./Add";
import Error from "@app/error";

export default async function Page() {
	const { devices, emp, success } = await getEmpAndDevicesList();
	if (!success) {
		return <Error />;
	}

	return <Add emp={emp} devices={devices} />;
}
