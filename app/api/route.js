import { dbConnect } from "@app/dbConnect";
import IPS from "@models/ips/IPS";
import mongoose from "mongoose";
import {  revalidateTag } from "next/cache";
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
    revalidateTag("home");
    return NextResponse.json({ done: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const ip = await IPS.find({}).sort({ added_date: -1 });
    

    return NextResponse.json(ip);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
