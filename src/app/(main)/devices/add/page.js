import Add from "./Add";
import { dbConnect } from "@app/dbConnect";
import DEVICES from "@models/ips/DEVICES";

// get data
async function getData() {
  try {
    await dbConnect();
    // get only unique device types
    const data = await DEVICES.find({}).distinct("device_type");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default async function Layout() {
  const data = await getData();
  return <Add data={data} />;
}

export const dynamic = "force-dynamic";
