import { dbConnect } from "@app/dbConnect";
import { convertDate } from "@lib/helpers";
import DEVICES from "@models/ips/DEVICES";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    let device = await DEVICES.find({}).sort({ updatedAt: -1 });
    device = convertDate(device);

    return NextResponse.json(device);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
