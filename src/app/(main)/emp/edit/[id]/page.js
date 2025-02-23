import React from "react";
import Edit from "./Edit";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { getEmpById } from "@server/emp/actions";
import Error from "@app/error";

export default async function Page({ params }) {
	const { id } = await params;

	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		return notFound;
	}

	const { success, emp, error } = await getEmpById(id);
	if (error || !success) {
		return <Error />;
	}

	return <Edit emp={emp} />;
}
