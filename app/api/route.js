import IPS from "@models/ips/IPS";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await IPS.create({
      ip: "192.168.80.10",
      added_by: "Added By is",
      device_type: "device Type is",
      location: "location is",
    });

    return NextResponse.json({ added: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 404 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.error({ error: "id is required", status: 400 });
    }
    const ip = await IPS.findByIdAndDelete(id);

    if (!ip) {
      return NextResponse.json({ error: "ip not found", status: 404 });
    }

    return NextResponse.json({ deleted: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}


// Get data by id

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.error({ error: "id is required", status: 400 });
    }
    const ip = await IPS.findById(id);

    if (!ip) {
      return NextResponse.json({ error: "ip not found", status: 404 });
    }

    return NextResponse.json(ip);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}