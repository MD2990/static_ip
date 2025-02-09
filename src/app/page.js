import Show from "./(main)/ip/Show/Show";
import { getIP } from "@server/ip/actions";

export default async function Page() {
	const { ip, devices, empTotal, devicesTotal } = await getIP()
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return { success: false, error: error.message || "Failed to get IP" };
		});
	return (
		<Show
			ip={ip}
			devices={devices}
			empTotal={empTotal}
			devicesTotal={devicesTotal}
		/>
	);
}
