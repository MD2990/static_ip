import { dbConnect } from "@app/dbConnect";
import IPS from "@models/ips/IPS";
import mongoose from "mongoose";
import { NextResponse } from "next/server";






export async function DELETE(request) {
  try {
    // add Next headers
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "id is required", status: 404 });
    }

    await IPS.findByIdAndDelete(id).catch((err) => {
      return NextResponse.json({ error: err.message, status: 500 });
    });
    
    return NextResponse.json({ done: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}




export async function GET() {
  try {
    await dbConnect();
    const ip = await IPS.find({});

    return NextResponse.json(ip);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
