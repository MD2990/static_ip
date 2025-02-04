"use server";
import { dbConnect } from "@app/dbConnect";
import { convertDate } from "@lib/helpers";
import EMP from "@models/ips/EMP";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
// get all employees
export async function getEmp() {
	try {
		await dbConnect();

		let data = await EMP.find({}).sort({ updatedAt: -1 });
		if (!data) {
			throw new Error("No data found");
		}

		data = convertDate(data);
		const emp = JSON.parse(JSON.stringify(data));

		if (!emp) {
			throw new Error("No data found");
		}

		return emp;
	} catch (error) {
		throw new Error(error.message);
	}
}

// get employee by id
export async function getEmpById(id) {
	try {
		await dbConnect();

		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			throw new Error("id is required");
		}

		const data = await EMP.findById(id).catch((err) => {
			throw new Error(err.message);
		});

		const emp = JSON.parse(JSON.stringify(data));

		return emp;
	} catch (error) {
		throw new Error(error.message);
	}
}

// put function
export async function updateEmp({ values, _id }) {
	try {
		await dbConnect();
		await EMP.findOneAndUpdate(
			{ _id },
			{ ...values, _id },
			{ new: true }
		).catch((err) => {
			throw new Error(err.message);
		});
		revalidatePath("/emp/show");
		return true;
	} catch (error) {
		throw new Error(error.message);
	}
}

// delete function
export async function deleteEmp({ _id }) {
	try {
		await dbConnect();
		await EMP.findByIdAndDelete(_id).catch((err) => {
			throw new Error(err.message);
		});

		revalidatePath("/emp/show");
		return true;
	} catch (error) {
		console.log(error);

		throw new Error(error.message);
	}
}

// post function
export async function addEmp({ values }) {
	try {
		await dbConnect();
		await EMP.create(values).catch((err) => {
			throw new Error(err.message);
		});

		revalidatePath("/emp/show");
		return true;
	} catch (error) {
		throw new Error(error.message);
	}
}
