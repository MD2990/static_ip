import React from "react";
import Show from "./Show";
async function getDevice() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_IP}/show_device/api`);
  const emp = await data.json();
  return emp;
}

export default async function Layout() {
  const device = await getDevice();

  return <Show device={device} />;
}
