import React from "react";
import { dbConnect, jsonify } from "./dbConnect";
import IPS from "@models/ips/IPS";
import Show from "./Show";

// get data function
async function getData() {
 await dbConnect();
  const data = await IPS.find(
    {},
    { __v: 0 },

    { sort: { added_date: -1 } }
  );
  const ips = jsonify(data);
  return ips;
}

export default async function Main() {
  const ip = await getData();

  return <Show ip={ip} />;
}
