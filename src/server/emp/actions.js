"use server";
import { dbConnect } from "@app/dbConnect";
import { convertDate } from "@lib/helpers";
import EMP from "@models/EMP";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
// get all employees
export async function getEmp() {
	try {
		await dbConnect();
		let data = await EMP.find({}).sort({ updatedAt: -1 });
		if (!data) {
			return {
				success: false,
				error: "No Employees found",
			};
		}

		data = convertDate(data);
		const emp = JSON.parse(JSON.stringify(data));

		if (!emp) {
			return {
				success: false,
				error: "No Employees found",
			};
		}

		return {
			success: true,
			emp: emp || [],
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to get Employees",
		};
	}
}

// get employee by id
export async function getEmpById(id) {
	try {
		await dbConnect();

		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			return {
				success: false,
				error: "Invalid ID provided",
			};
		}
		const data = await EMP.findById(id);
		if (!data) {
			return {
				success: false,
				error: "Employee not found",
			};
		}

		const emp = JSON.parse(JSON.stringify(data));
		return {
			emp,
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to get Employee",
		};
	}
}

// put function
export async function updateEmp({ values, _id }) {
	try {
		await dbConnect();
		const emp = await EMP.findOneAndUpdate(
			{ _id },
			{ ...values, _id },
			{ new: true }
		);

		if (!emp) {
			return {
				success: false,
				error: "Employee not found",
			};
		}

		revalidatePath("/emp/show");
		return {
			success: true,
			message: `${values?.employee_name?.toUpperCase()} Updated Successfully`,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to update Employee",
		};
	}
}

// delete function
export async function deleteEmp({ _id }) {
	try {
		await dbConnect();
		const emp = await EMP.findByIdAndDelete(_id);

		if (!emp) {
			return {
				success: false,
				error: "Employee not found",
			};
		}

		revalidatePath("/emp/show");
		return {
			success: true,
			message: `${emp.employee_name} Deleted Successfully`,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to delete Employee",
		};
	}
}

// post function
export async function addEmp({ values }) {
	try {
		await dbConnect();
		// check if employee already exists
		const existingEmp = await EMP.findOne({
			employee_name: { $regex: new RegExp(`^${values?.employee_name}$`, "i") },
		});

		if (existingEmp) {
			return {
				success: false,
				error: `Employee ${values?.employee_name?.toUpperCase()} already exists`,
			};
		}
		const emp = await EMP.create(values);

		if (!emp) {
			return {
				success: false,
				error: "Failed to add Employee",
			};
		}

		revalidatePath("/emp/show");
		return {
			success: true,
			message: `${values?.employee_name?.toUpperCase()} Added Successfully`,
		};
	} catch (error) {
		return {
			success: false,
			error: "Employee already exists",
		};
	}
}
