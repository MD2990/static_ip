import React from "react";
import Edit from "./Edit";
import { getList } from "@app/(ips)/add_ip/layout";
import { dbConnect } from "@app/dbConnect";
import mongoose from "mongoose";
import IPS from "@models/ips/IPS";

async function getData(id) {
  try {
    await dbConnect();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("id is required");
    }

    const ip = await IPS.findById(id).catch((err) => {
      throw new Error(err.message);
    });

    const data = JSON.parse(JSON.stringify(ip));

    return {
      ip: data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

// revalidate every 5 second

export const revalidate = 5;

export default async function Layout({ params }) {
  const id = params.id;
  const { ip } = await getData(id);

  const { devices, emp } = await getList();
  return <Edit data={ip} devices={devices} emp={emp} />;
}
