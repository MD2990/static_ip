import { dbConnect } from "@app/dbConnect";
import DEVICES from "@models/ips/DEVICES";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract data from the JSON request
    const { device_type } = await request.json();

    // check if the ip already exists

    const deviceExists = await DEVICES.findOne({ device_type });

    if (deviceExists)
      return NextResponse.json(
        {
          message: "Employee already exists",
        },
        {
          status: 409,
        }
      );

    // Attempt to save the data
    return await DEVICES.create({
      device_type,
    }).then(() => {
      revalidateTag("device_home");
      revalidateTag("unq_device");
      revalidateTag("get_lists");

      return NextResponse.json(
        {
          message: "Added Successfully",
        },
        {
          status: 200,
        }
      );
    });

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

    // get only unique device types
    const device = await DEVICES.find({}).distinct("device_type");

    return NextResponse.json(device);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
