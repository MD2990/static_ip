import { getIpById, getEmpAndDevicesList } from "@server/ip/actions";
import Edit from "./Edit";

export default async function page({ params }) {
	const { id } = await params;
	const { ip } = await getIpById(id);

	const { devices, emp } = await getEmpAndDevicesList();
	return <Edit data={ip} devices={devices} emp={emp} />;
}
