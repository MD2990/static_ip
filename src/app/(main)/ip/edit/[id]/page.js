import { getIpById, getEmpAndDevicesList } from "@server/ip/actions";
import Edit from "./Edit";
import { notFound } from "next/navigation";

export default async function page({ params }) {
	const { id } = await params;
	const { ip } = await getIpById(id);

	if (!id || !ip) {
		return notFound();
	}

	const { devices, emp } = await getEmpAndDevicesList();
	return <Edit data={ip} devices={devices} emp={emp} />;
}
