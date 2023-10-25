import { dbConnect } from "@app/dbConnect";
import DEVICES from "@models/ips/DEVICES";
import EMP from "@models/ips/EMP";
import IPS from "@models/ips/IPS";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract data from the JSON request
    let { ip, added_by, device_type, location, added_date } =
      await request.json();

    // check if the ip already exists

    const ipExists = await IPS.findOne({ ip: ip });

    if (ipExists)
      return NextResponse.json(
        {
          message: "IP Already Exists",
        },
        {
          status: 409,
        }
      );

    // Attempt to save the data
    return await IPS.create({
      ip,
      added_by,
      device_type,
      location,
      added_date,
    }).then(() =>
      NextResponse.json(
        {
          message: "Added Successfully",
        },
        {
          status: 200,
        }
      )
    );

    // Data was saved successfully
  } catch (error) {
    // Handle other errors
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    // get devices with only device_type

    const devices = await DEVICES.find({})
      .select("device_type -_id")
      .sort({ updatedAt: -1 });

    const emp = await EMP.find({})
      .select("employee_name -_id")
      .sort({ updatedAt: -1 });

    return NextResponse.json({ devices, emp });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
