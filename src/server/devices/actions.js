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
			return {
				success: false,
				error: "No Devices found",
			};
		}

		// convert date
		data = convertDate(data);
		// parse data
		const devices = JSON.parse(JSON.stringify(data));

		if (!devices) {
			return {
				success: false,
				error: "No Devices found",
			};
		}
		return {
			success: true,
			device: devices || [],
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to get Devices",
		};
	}
}

// delete device
export async function deleteDevice(id) {
	try {
		await dbConnect();
		const device = await DEVICES.findByIdAndDelete(id);
		if (!device)
			return {
				success: false,
				error: "Device not found",
			};

		revalidatePath("/devices/show");
		return {
			success: true,
			message: "Device deleted successfully",
		};
	} catch (error) {
		return {
			success: false,
			error: "Failed to delete device",
		};
	}
}

// update device
export async function updateDevice({ _id, values }) {
	try {
		await dbConnect();

		// check if device exists
		const { success, device_type, error } = await sanitizeDeviceType(
			values.device_type
		);

		if (!success || error) {
			return {
				success: false,
				error: error,
			};
		}

		const device = await DEVICES.findByIdAndUpdate(
			_id,
			{ device_type },
			{
				new: true,
				runValidators: true,
			}
		);
		if (!device) {
			return {
				success: false,
				error: "Device not found",
			};
		}

		revalidatePath("/devices/show");
		return {
			success: true,
			message: `${device_type} updated successfully`,
		};
	} catch (error) {
		return {
			success: false,
			error: "Failed to update device",
		};
	}
}
// add device
export async function addDevice(data) {
	try {
		await dbConnect();
		const { device_type: deviceType } = data || {};

		// Validate and clean device_type
		const { success, device_type, error } = await sanitizeDeviceType(
			deviceType
		);

		if (!success || error) {
			return {
				success: false,
				error: error,
			};
		}

		// Create new device with cleaned data
		const device = new DEVICES({
			device_type,
		});

		const addedDevice = await device.save();
		if (!addedDevice) {
			return {
				success: false,
				error: "Failed to add device",
			};
		}

		revalidatePath("/devices/show");
		return {
			success: true,
			message: `${device_type} added successfully`,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || "Failed to add device",
		};
	}
}

async function sanitizeDeviceType(device_type) {
	if (!device_type || typeof device_type !== "string") {
		return {
			success: false,
			error: "Device is required",
		};
	}

	// Clean the device type (trim and uppercase)
	const cleanDeviceType = device_type.trim().toUpperCase();
	// Validate empty string after trim
	if (cleanDeviceType.length === 0) {
		return {
			success: false,
			error: "Device type is required",
		};
	}

	// Optional: Check for special characters
	const specialCharsRegex = /[!+-@#$%^&*(),.?":{}|<>]/;
	if (specialCharsRegex.test(cleanDeviceType)) {
		return {
			success: false,
			error: "Special characters are not allowed",
		};
	}

	// Check if device with same device_type exists (case insensitive)
	const existingDevice = await DEVICES.findOne({
		device_type: { $regex: new RegExp(`^${cleanDeviceType}$`, "i") },
	});

	if (existingDevice) {
		return {
			success: false,
			error: `Device type ${cleanDeviceType} already exists`,
		};
	}
	return {
		success: true,
		device_type: cleanDeviceType,
	};
}

// get device by id
export async function getDeviceById(id) {
	try {
		await dbConnect();
		const data = await DEVICES.findOne({ _id: id });
		if (!data) {
			return {
				success: false,
				error: "Device not found",
			};
		}
		const device = JSON.parse(JSON.stringify(data));
		return {
			success: true,
			device: device || {},
		};
	} catch (error) {
		return {
			success: false,
			error: "Failed to get Device",
		};
	}
}
