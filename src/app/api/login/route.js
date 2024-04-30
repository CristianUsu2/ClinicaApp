import { db } from "../libs/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  const connection = await db();
  try {
    const { Cedula, Contra } = await request.json();
    console.log("cedula", Cedula);
    console.log("contra", Contra);

    const [result] = await connection.execute(
      "SELECT * FROM usuarios WHERE Cedula=? AND Contra=?",
      [Cedula, Contra]
    );
    
    if (result.length == 0) {
      return NextResponse.json({
        message:
          "No se encuentra usuario en la base de datos por favor retificar",
      });
    } else {
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json({ message: error.message });
  } finally{
    await connection.end()
  }
}
