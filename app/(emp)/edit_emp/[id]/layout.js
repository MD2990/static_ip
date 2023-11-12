import React from "react";
import EditEmp from "./EditEmp";
import { dbConnect } from "@app/dbConnect";
import mongoose from "mongoose";
import EMP from "@models/ips/EMP";

async function getData(id) {
  try {
    await dbConnect();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("id is required");
    }

    const data = await EMP.findById(id).catch((err) => {
      throw new Error(err.message);
    });

    const emp = JSON.parse(JSON.stringify({ data }));

    return {
      emp: emp.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

// revalidate every 5 second

export const revalidate = 5;

export default async function Layout({ params }) {
  const id = params.id;
  const { emp } = await getData(id);

  return <EditEmp data={emp} />;
}
