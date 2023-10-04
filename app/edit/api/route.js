import IPS from "@models/ips/IPS";
import { NextResponse } from "next/server";
const mongodb = require("mongodb");
var mongoose = require("mongoose");

export async function PUT(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { name } = await request.json();
    if (!name || name.trim() === "" || !id)
      return NextResponse.error({ error: "name is required", status: 400 });

    await db
      .collection("todo")
      .updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: { name: name?.trim() } }
      )

      .catch((err) => NextResponse.error({ error: err.message, status: 500 }));

    return NextResponse.json({ done: true });
  } catch (error) {
    return NextResponse.error({ error: error.message, status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid('your id here')) {
      return NextResponse.json({ error: "id is required", status: 404 });
    }


    // convert string to mongoose object id
    const newId = new mongoose.Types.ObjectId(id);

    const ip = await IPS.findById(newId ).catch((err) => {
      return NextResponse.json({ error: err.message, status: 500 });
    });


    if (!ip) {
      return NextResponse.json({ error: "ip not found", status: 404 });
    }

    return NextResponse.json(ip);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
