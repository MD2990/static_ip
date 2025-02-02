import Show from "./(main)/ip/Show/Show";
import { getData } from "@server/ip/actions";

export default async function Page() {
	const { ip, devices, empTotal, devicesTotal } = await getData();
	return (
		<Show
			ip={ip}
			devices={devices}
			empTotal={empTotal}
			devicesTotal={devicesTotal}
		/>
	);
}
