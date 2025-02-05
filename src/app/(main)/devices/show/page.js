import { getDevices } from "@server/devices/actions";
import Show from "./Show";
export default async function page() {
	const device = await getDevices();
	return <Show device={device} />;
}
