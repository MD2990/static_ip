import { getIpById, getEmpAndDevicesList } from "@server/ip/actions";
import Edit from "./Edit";
import Error from "@app/error";

export default async function page({ params }) {
	const { id } = await params;
	const { ip, success, error } = await getIpById(id);
	if (!id || !ip || !success || error) {
		return <Error />;
	}

	const {
		devices,
		emp,
		success: suc,
		error: err,
	} = await getEmpAndDevicesList();
	if (!suc || err) {
		return <Error />;
	}
	return <Edit data={ip} devices={devices} emp={emp} />;
}
