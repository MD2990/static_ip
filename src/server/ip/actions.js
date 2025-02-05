"use server";

import IPS from "@models/ips/IPS";
import DEVICES from "@models/ips/DEVICES";
import { convertDate } from "@lib/helpers";
import EMP from "@models/ips/EMP";
import { dbConnect } from "@app/dbConnect";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

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
		throw new Error(error.message);
	}
}

export async function getIpById(id) {
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

		return { devices: data.devices, emp: data.emp };
	} catch (error) {
		throw new Error(error.message);
	}
}

// put function
export async function updateIP({ values, _id }) {
	try {
		await dbConnect();

		if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
			throw new Error("id is required");
		}

		// update ip
		await IPS.findOneAndUpdate(
			{ _id },
			{ ...values, _id },
			{ new: true }
		).catch((err) => {
			throw new Error(err.message);
		});
		revalidatePath("/");
		return true;
	} catch (error) {
		throw new Error(error.message);
	}
}

// add function
export async function addIP(values) {
	try {
		await dbConnect();
		// check if ip already exists
		const ipExists = await IPS.findOne({ ip: values.ip });
		if (ipExists) {
			throw new Error(`${values.ip} Already exist`);
		}

		// create ip

		await IPS.create(values).catch((err) => {
			throw new Error(err.message);
		});
		revalidatePath("/");
		return true;
	} catch (error) {
		throw new Error(error.message);
	}
}

// delete function
export async function deleteIP({ id }) {
	try {
		await dbConnect();
		const ip = await IPS.findByIdAndDelete(id).catch((err) => {
			throw new Error(err.message);
		});
		if (!ip) {
			throw new Error("IP not found");
		}

		revalidatePath("/");
		return true;
	} catch (error) {
		throw new Error(error.message);
	}
}
