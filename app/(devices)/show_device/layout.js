import React from "react";
import Show from "./Show";
import { dbConnect } from "@app/dbConnect";
import DEVICES from "@models/ips/DEVICES";
import { convertDate } from "@lib/helpers";
async function getDevice() {
  try {
    await dbConnect();

    let data = await DEVICES.find({}).sort({ updatedAt: -1 });
    data = convertDate(data);

    const device = JSON.parse(JSON.stringify(data));

    return device;
  } catch (error) {
    throw new Error(error.message);
  }
}

// revalidate: 5,
export const revalidate = 5;
export default async function Layout() {
  const device = await getDevice();

  return <Show device={device} />;
}
