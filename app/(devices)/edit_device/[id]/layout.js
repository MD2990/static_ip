import React from "react";
import Edit from "./Edit";

async function getData(id) {
  // use fetch to get data from an API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_IP}/edit_device/api?id=${id}`,
    {
      next: { tags: ["device_id"] },
    }
  );
  const data = await res.json();
  return data;
}

export default async function Layout({ params }) {
  const id = params.id;
  const device = await getData(id);

  return <Edit data={device} />;
}
