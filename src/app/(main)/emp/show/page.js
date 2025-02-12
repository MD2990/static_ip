import { getEmp } from "@server/emp/actions";
import Show from "./Show";
import Error from "@app/error";

export default async function page() {
	const { emp, error, success } = await getEmp();
	if (error || !success) {
		return <Error />;
	}

	return <Show emp={emp} />;
}
