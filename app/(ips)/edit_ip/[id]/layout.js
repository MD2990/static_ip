import React from "react";
import Edit from "./Edit";
import { getList } from "@app/(ips)/add_ip/layout";

async function getData(id) {
  // use fetch to get data from an API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_IP}/edit_ip/api?id=${id}`,
    {
      next: { tags: ["edit_ip"] },
    }
  );
  const data = await res.json();
  return data;
}

export default async function Layout({ params }) {
  const id = params.id;
  const ip = await getData(id);
  const { devices, emp } = await getList();



  return <Edit data={ip} devices={devices} emp ={emp}  />;
}
