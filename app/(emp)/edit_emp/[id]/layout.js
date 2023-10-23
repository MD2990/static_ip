import React from "react";
import EditEmp from "./EditEmp";

async function getData(id) {
  // use fetch to get data from an API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_IP}/edit_emp/api?id=${id}`,
    {
      next: { tags: ["emp_id"] },
    }
  );
  const data = await res.json();
  return data;
}

export default async function Layout({ params }) {
  const id = params.id;
  const emp = await getData(id);

  return <EditEmp data={emp} />;
}