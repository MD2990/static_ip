import Add from "@app/(ips)/add_ip/Add";
import { dbConnect } from "@app/dbConnect";
import DEVICES from "@models/ips/DEVICES";
import EMP from "@models/ips/EMP";
import React from "react";

export async function getList() {
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

// revalidate every 5 second

export const revalidate = 5;

export default async function Layout() {
  const { devices, emp } = await getList();

  return <Add emp={emp} devices={devices} />;
}
