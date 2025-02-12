import { getDevices } from "@server/devices/actions";
import Show from "./Show";
import Error from "@app/error";
export default async function page() {
	const { success, device, error } = await getDevices();
	if (error || !success) {
		return <Error />;
	}
	return <Show device={device} />;
}
