import { dbConnect } from "./dbConnect";
import IPS from "@models/ips/IPS";
import DEVICES from "@models/ips/DEVICES";
import EMP from "@models/ips/EMP";
import { convertDate } from "@lib/helpers";
import Show from "./(ips)/Show";

async function getData() {
  try {
    await dbConnect();

    let ip = await IPS.find({}).sort({ updatedAt: -1 });
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
export const dynamic = "force-dynamic";

export default async function Page() {
  const { ip, devices, empTotal, devicesTotal } = await getData();
  return (
    <Show
      ip={ip}
      devices={devices}
      empTotal={empTotal}
      devicesTotal={devicesTotal}
    />
  );
}
