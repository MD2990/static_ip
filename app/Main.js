import React from "react";
import Show from "./Show";
// get data function
async function getData() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_IP}/api`, {
      next: { tags: ["home"] },
    });
    const ip = (await data?.json()) || [];
    return ip;
  } catch (error) {
    return error.message;
  }
}

export default async function Main() {

  const ip = await getData();
  return <Show ip={ip} />;
}
