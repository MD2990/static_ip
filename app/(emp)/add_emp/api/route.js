import { dbConnect } from "@app/dbConnect";
import EMP from "@models/ips/EMP";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract data from the JSON request
    const { employee_name } = await request.json();

    // check if the ip already exists

    const empExists = await EMP.findOne({ employee_name });

    if (empExists)
      return NextResponse.json(
        {
          message: "Employee already exists",
        },
        {
          status: 409,
        }
      );

    // Attempt to save the data
    return await EMP.create({
      employee_name,
    }).then(() => {
      revalidateTag("emp_home");

      return NextResponse.json(
        {
          message: "Added Successfully",
        },
        {
          status: 200,
        }
      );
    });

    // Data was saved successfully
  } catch (error) {
    // Handle other errors
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
