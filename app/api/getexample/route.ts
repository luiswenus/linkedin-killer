import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    const something = "something";

    return NextResponse.json({ something }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
