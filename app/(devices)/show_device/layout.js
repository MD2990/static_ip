import React from "react";
import Show from "./Show";

async function getDevice() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_IP}/show_device/api`, {
    next: { tags: ["device_home"] },
  });
  const emp = await data.json();
   return emp;
}

export default async function layout() {
  const device = await getDevice();

  return <Show device={device} />;
}
