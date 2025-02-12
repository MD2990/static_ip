import Show from "./(main)/ip/Show/Show";
import { getIP } from "@server/ip/actions";
import Error from "./error";

export default async function Page() {
	const { ip, devices, empTotal, devicesTotal, success, error } = await getIP();
	if (error || !success) {
		return <Error />;
	}

	return (
		<Show
			ip={ip}
			devices={devices}
			empTotal={empTotal}
			devicesTotal={devicesTotal}
		/>
	);
}
