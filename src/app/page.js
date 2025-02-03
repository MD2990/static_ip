import Show from "./(main)/ip/Show/Show";
import { getIP } from "@server/ip/actions";

export default async function Page() {
	const { ip, devices, empTotal, devicesTotal } = await getIP();
	return (
		<Show
			ip={ip}
			devices={devices}
			empTotal={empTotal}
			devicesTotal={devicesTotal}
		/>
	);
}
