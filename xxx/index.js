/* import React from "react";
import { Center, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Show from "../components/IPs/Show";
import IPS from "../models/ips/IPS";
import { jsonify } from "../utils/dbConnect";
import dbConnect from "@app/dbConnect";

export default function Home({ ip }) {
  if (!ip)
    return (
      <Center mt="25%">
        <Heading color={"gray.300"}>Loading...</Heading>
      </Center>
    );

  return (
    <>
      <Head>
        <title>Static IPs</title>
        <meta name="description" content="Created By Majid Ahmed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Show ip={ip} />
    </>
  );
}
export async function getServerSideProps() {
  dbConnect();
  const data = await IPS.find({});

  // sort data by added_date
  const ip = jsonify(data);
  ip.sort((a, b) => (a.added_date > b.added_date ? -1 : 1));
  return {
    props: {
      ip,
    },
  };
}
 */