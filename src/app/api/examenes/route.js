import { NextResponse } from "next/server";
import { db } from "../libs/database";

export async function GET() {
  const connection = await db();
  try {
    const res = await connection.execute("select * from examenes");
    console.log("res", res);
    return NextResponse.json(res[0]);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error.message });
  } finally {
    await connection.end();
  }
}
