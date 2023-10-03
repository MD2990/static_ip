import React from "react";
import { useRouter } from "next/router";
import IPS from "../../models/ips/IPS";
import { jsonify } from "../../utils/dbConnect";
import dbConnect from "@app/dbConnect";
import EditIps from "../../components/IPs/EditIps";

export default function Edit({ ips }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <EditIps ips={ips} />;
}
export async function getStaticProps({ params }) {
  await dbConnect();

  const data = await IPS.findById(params.id);

  const ips = await jsonify(data);
  if (!ips) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ips,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  await dbConnect();
  const data = await IPS.find({});

  const ips = await jsonify(data);
  // Get the paths we want to pre-render based on posts
  const paths = ips.map((c) => ({
    params: { id: c._id.toString() },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}
