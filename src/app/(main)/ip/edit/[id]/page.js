export const dynamic = "force-dynamic";

import { dbConnect } from "@app/dbConnect";
import mongoose from "mongoose";
import IPS from "@models/ips/IPS";
import { getList } from "../../add/page";

async function getData(id) {
	try {
		await dbConnect();

		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			throw new Error("id is required");
		}

		const ip = await IPS.findById(id).catch((err) => {
			throw new Error(err.message);
		});

		const data = JSON.parse(JSON.stringify(ip));

		return {
			ip: data,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}

export default async function page({ params }) {
	const { id } = await params;
	const { ip } = await getData(id);

	const { devices, emp } = await getList();
	return (
		<div>
			<pre>{JSON.stringify(ip, null, 2)}</pre>
		</div>
	);

	{
		/* <Edit data={ip} devices={devices} emp={emp} />; */
	}
}
