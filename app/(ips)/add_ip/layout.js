import Add from "@app/(ips)/add_ip/Add";
import React from "react";

export async function getList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/add_ip/api`);
  const { devices, emp } = await res.json();
  return { devices, emp };
}

export default async function Layout() {
  const { devices, emp } = await getList();

  return <Add emp={emp} devices={devices} />;
}
