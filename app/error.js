"use client";
import Error from "next/error";
import React from "react";

export default function error() {
  return <Error statusCode={404} />;
}
