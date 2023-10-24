import { dbConnect } from "@app/dbConnect";
import IPS from "@models/ips/IPS";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
var mongoose = require("mongoose");

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "id is required", status: 404 });
    }

    const ip = await IPS.findById(id).catch((err) => {
      return NextResponse.json({ error: err.message, status: 500 });
    });
    revalidateTag("get_lists");
    return NextResponse.json(ip);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
export async function DELETE(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "id is required", status: 404 });
    }

    await IPS.findByIdAndDelete(id).catch((err) => {
      return NextResponse.json({ error: err.message, status: 500 });
    });
    /*   revalidateTag("home");
    revalidateTag("id"); */
    return NextResponse.json({ done: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

// PUT

export async function PUT(request) {
  try {
    await dbConnect();

    // Extract data from the JSON request
    const { _id, ip, added_by, device_type, location, added_date } =
      await request.json();
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json({ message: "id is required" }, { status: 404 });
    }

    // check if ip is already exist

    // Attempt to save the data
    return await IPS.findByIdAndUpdate(_id, {
      ip,
      added_by,
      device_type,
      location,
      added_date,
    }).then(() => {
      revalidateTag("home");
      revalidateTag("edit_ip");
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
    // check if the error is duplicate key
    if (error.code === 11000) {
      return NextResponse.json(
        {
          message: "IP Already Exists",
        },
        {
          status: 409,
        }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
