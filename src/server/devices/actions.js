"use server";
import { dbConnect } from "@app/dbConnect";
import { convertDate } from "@lib/helpers";
import DEVICES from "@models/DEVICES";
import { revalidatePath } from "next/cache";

// get devices
export async function getDevices() {
	try {
		await dbConnect();
		// get only unique device types
		let data = await DEVICES.find({}, "-__v").sort({ createdAt: -1 });
		if (!data) {
			throw new Error("No data found");
		}

		// convert date
		data = convertDate(data);
		// parse data
		const devices = JSON.parse(JSON.stringify(data));

		if (!devices) {
			throw new Error("No data found");
		}
		return devices;
	} catch (error) {
		throw new Error(error.message);
	}
}

// delete device
export async function deleteDevice(id) {
	try {
		await dbConnect();
		const device = await DEVICES.findByIdAndDelete(id);
		if (!device) {
			throw new Error("Device not found");
		}
		revalidatePath("/devices/show");
		return true;
	} catch (error) {
		throw new Error(error.message);
	}
}

// update device
export async function updateDevice({ _id, values }) {
	try {
		await dbConnect();

		// check if device exists
		const cleanDevice = await sanitizeDeviceType(values.device_type);
		const device = await DEVICES.findByIdAndUpdate(
			_id,
			{ device_type: cleanDevice },
			{
				new: true,
				runValidators: true,
			}
		);
		if (!device) {
			throw new Error("Device not found");
		}
		revalidatePath("/devices/show");
		return true;
	} catch (error) {
		throw new Error(error.message);
	}
}

// add device
export async function addDevice(data) {
	try {
		await dbConnect();
		const { device_type } = data || {};

		// Validate and clean device_type
		const cleanDeviceType = await sanitizeDeviceType(device_type);

		// Create new device with cleaned data
		const device = new DEVICES({ device_type: cleanDeviceType });
		await device.save();
		revalidatePath("/devices/show");
		return true;
	} catch (error) {
		throw new Error(error.message);
	}
}

async function sanitizeDeviceType(device_type) {
	if (!device_type || typeof device_type !== "string") {
		throw new Error("Device is required");
	}

	// Clean the device type (trim and uppercase)
	const cleanDeviceType = device_type.trim().toUpperCase();

	// Validate empty string after trim
	if (cleanDeviceType.length === 0) {
		throw new Error("Device cannot be empty");
	}

	// Optional: Check for special characters
	const specialCharsRegex = /[!+-@#$%^&*(),.?":{}|<>]/;
	if (specialCharsRegex.test(cleanDeviceType)) {
		throw new Error("Device cannot contain special characters");
	}

	// Check if device with same device_type exists (case insensitive)
	const existingDevice = await DEVICES.findOne({
		device_type: { $regex: new RegExp(`^${cleanDeviceType}$`, "i") },
	});

	if (existingDevice) {
		throw new Error("Device already exists");
	}
	return cleanDeviceType;
}

// get device by id
export async function getDeviceById(id) {
	try {
		await dbConnect();
		const data = await DEVICES.findOne({ _id: id });
		if (!data) {
			throw new Error("Device not found");
		}
		const device = JSON.parse(JSON.stringify(data));
		return device;
	} catch (error) {
		throw new Error(error.message);
	}
}
