export const dynamic = "force-dynamic";

import React from "react";
import Edit from "./Edit";
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


export default async function Page({ params }) {
  const id = params.id;
  const { emp } = await getData(id);

  return <Edit data={emp} />;
}
