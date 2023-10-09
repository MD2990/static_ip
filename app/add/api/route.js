import { dbConnect } from "@app/dbConnect";
import IPS from "@models/ips/IPS";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract data from the JSON request
    const { ip, added_by, device_type, location } = await request.json();

    // check if the ip already exists

    const ipExists = await IPS.countDocuments({ ip: ip }).exec();

    if (ipExists > 0)
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
