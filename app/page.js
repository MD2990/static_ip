import React from "react";
import Show from "./(ips)/Show";

async function getData() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_IP}/api`, {
      next: { tags: ["home"] },
    });
    const {ip, devices} = (await data?.json()) || [];

    return { ip, devices}
  } catch (error) {
    return error.message;
  }
}

export default async function page() {
  const {ip, devices} = await getData();
  return <Show ip={ip} devices={devices} />;
}
