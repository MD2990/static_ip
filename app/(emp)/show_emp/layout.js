import React from "react";
import Show from "./Show";
import { dbConnect } from "@app/dbConnect";
import EMP from "@models/ips/EMP";
import { convertDate } from "@lib/helpers";

async function getEmp() {
  try {
    await dbConnect();

    let data = await EMP.find({}).sort({ updatedAt: -1 });
    data = convertDate(data);
    const emp = JSON.parse(JSON.stringify(data));

    return emp;
  } catch (error) {
    throw new Error(error.message);
  }
}

// revalidate every 5 second

export const revalidate = 5;

export default async function layout() {
  const emp = await getEmp();

  return <Show emp={emp} />;
}
