import React from "react";
import EditIp from "./EditIp";

// get data by id
async function getData(id) {
  // use fetch to get data from an API
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/edit/api?id=${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
export default async function Layout({ params }) {
  const id = params.id;
  const ip = await getData(id);
  return <EditIp data={ip} />;
}
