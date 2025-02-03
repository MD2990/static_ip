import { getEmpAndDevicesList } from "@server/ip/actions";
import Add from "./Add";

export default async function Page() {
	const { devices, emp } = await getEmpAndDevicesList();

	return <Add emp={emp} devices={devices} />;
}
