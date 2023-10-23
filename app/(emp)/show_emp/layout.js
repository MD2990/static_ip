import React from "react";
import Show from "./Show";

async function getEmp() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_IP}/show_emp/api`, {
    next: { tags: ["emp_home"] },
  });
  const emp = await data.json();
  return emp;
}

export default async function layout() {
  const emp = await getEmp();

  return <Show emp={emp} />;
}
