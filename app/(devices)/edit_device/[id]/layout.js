import React from "react";
import Edit from "./Edit";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import DEVICES from "@models/ips/DEVICES";

async function getData(id) {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "id is required", status: 404 });
    }

    const data = await DEVICES.findById(id).catch((err) => {
      return NextResponse.json({ error: err.message, status: 500 });
    });

    const device = JSON.parse(JSON.stringify({ data }));

    return {
      device: device.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export default async function Layout({ params }) {
  const id = params.id;
  const { device } = await getData(id);

  return <Edit data={device} />;
}
