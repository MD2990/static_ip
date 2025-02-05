import { getDeviceById } from "@server/devices/actions";
import Edit from "./Edit";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export default async function Layout({ params }) {
	const { id } = await params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return notFound();
	}
	const device = await getDeviceById(id);
	return <Edit device={device} />;
}
