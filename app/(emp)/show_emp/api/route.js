import { dbConnect } from "@app/dbConnect";
import { convertDate } from "@lib/helpers";
import EMP from "@models/ips/EMP";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await dbConnect();

    let emp = await EMP.find({}).sort({ updatedAt: -1 });

    emp = convertDate(emp);

    revalidateTag("emp_home");

    return NextResponse.json(emp);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
