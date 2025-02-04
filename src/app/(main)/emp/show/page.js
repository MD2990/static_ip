import { getEmp } from "@server/emp/actions";
import Show from "./Show";

export default async function page() {
	const emp = await getEmp();

	return <Show emp={emp} />;
}
