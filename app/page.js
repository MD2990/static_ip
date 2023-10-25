import React from "react";
import Show from "./(ips)/Show";

async function getData() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_IP}/api`);
    const { ip, devices, empTotal, devicesTotal } = (await data?.json()) || [];

    return { ip, devices, empTotal, devicesTotal };
  } catch (error) {
    return error.message;
  }
}
export const dynamic = "force-dynamic";

export default async function Page() {
  const { ip, devices, empTotal, devicesTotal } = await getData();
  return (
    <Show
      ip={ip}
      devices={devices}
      empTotal={empTotal}
      devicesTotal={devicesTotal}
    />
  );
}
