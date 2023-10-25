import React from "react";
import Add from "./Add";

// get data
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/add_device/api`);
  const data = await res.json();
  return data;
}

export default async function Layout() {
  const data = await getData();
  return <Add data={data} />;
}
