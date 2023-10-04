import React from "react";
import EditIp from "./EditIp";

// get data by id
async function getData(id) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_IP}/api?id=${id}}`);
  const ips = await data.json();

  console.log(ips);

  return ips;
}

export default function Layout({ params }) {
  const id = params.id;
  const ip = getData(id);

  return (
    <>
      <h1>Edit </h1>
      <EditIp data={ip} />
    </>
  );
}
