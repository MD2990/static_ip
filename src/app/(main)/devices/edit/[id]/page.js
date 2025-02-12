import { getDeviceById } from "@server/devices/actions";
import Edit from "./Edit";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Error from "@app/error";

export default async function Layout({ params }) {
	const { id } = await params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return notFound();
	}
	const { success, device, error } = await getDeviceById(id);
	if (!success || error) {
		return <Error />;
	}
	return <Edit device={device} />;
}
