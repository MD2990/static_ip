"use server";

import DEVICES from "@models/DEVICES";
import { convertDate } from "@lib/helpers";
import EMP from "@models/EMP";
import { dbConnect } from "@app/dbConnect";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import IPS from "@models/IPS";

export async function getIP() {
	try {
		await dbConnect();
		let ip = await IPS.find({}, "-__v").sort({ updatedAt: -1 });
		// get devices number from Devices collection
		const devicesTotal = await DEVICES.find({}).countDocuments();
		const empTotal = await EMP.find({}).countDocuments();
		// convert createdAt to a normal date format (not a timestamp)
		ip = convertDate(ip);
		// get unique device types from the database using aggregation and count the number of each device type
		const devices = await IPS.aggregate([
			{
				$group: {
					_id: "$device_type",
					count: { $sum: 1 },
				},
			},
		]);

		const data = JSON.parse(
			JSON.stringify({ ip, devices, empTotal, devicesTotal })
		);

		return {
			ip: data.ip,
			devices: data.devices,
			empTotal: data.empTotal,
			devicesTotal: data.devicesTotal,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to add IP",
		};
	}
}

export async function getIpById(id) {
	try {
		await dbConnect();

		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			return {
				success: false,
				error: "Invalid ID provided",
			};
		}

		const ip = await IPS.findById(id);

		if (!ip) {
			return {
				success: false,
				error: "IP not found",
			};
		}
		const data = JSON.parse(JSON.stringify(ip));
		return {
			ip: data,
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to get IP",
		};
	}
}

export async function getEmpAndDevicesList() {
	try {
		await dbConnect();
		const devices = await DEVICES.find({})
			.select("device_type -_id")
			.sort({ updatedAt: -1 });

		const emp = await EMP.find({})
			.select("employee_name -_id")
			.sort({ updatedAt: -1 });

		const data = JSON.parse(JSON.stringify({ devices, emp }));

		return { devices: data.devices, emp: data.emp, success: true };
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to get devices and employees",
		};
	}
}

// put function
export async function updateIP({ values, _id }) {
	try {
		await dbConnect();

		if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
			return {
				success: false,
				error: "Invalid ID provided",
			};
		}

		// Check if IP already exists (excluding current record)
		const existingIP = await IPS.findOne({
			ip: values.ip,
			_id: { $ne: _id },
		});

		if (existingIP) {
			return {
				success: false,
				error: `IP ${values?.ip} already exists`,
			};
		}

		await IPS.findOneAndUpdate({ _id }, { ...values }, { new: true });
		revalidatePath("/");
		return { success: true };
	} catch (err) {
		return {
			success: false,
			error: err?.message || "Failed to update IP",
		};
	}
}

// add function
export async function addIP(values) {
	try {
		await dbConnect();

		if (!values || !values.ip) {
			return {
				success: false,
				error: "IP address is required",
			};
		}

		// check if ip already exists
		const existingIP = await IPS.findOne({ ip: values.ip });

		if (existingIP) {
			return {
				success: false,
				error: `IP ${values.ip} already exists`,
			};
		}

		// create ip
		const ip = await IPS.create(values);

		if (!ip) {
			return {
				success: false,
				error: "Failed to add IP",
			};
		}

		revalidatePath("/");
		return {
			success: true,
			message: `IP ${values.ip} added successfully`,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to add IP",
		};
	}
}

// delete function
export async function deleteIP({ id }) {
	try {
		await dbConnect();
		const ip = await IPS.findByIdAndDelete(id);
		if (!ip) {
			return {
				success: false,
				error: "IP not found",
			};
		} else {
			revalidatePath("/");
			return {
				success: true,
				message: "IP deleted successfully",
			};
		}
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to delete IP",
		};
	}
}
