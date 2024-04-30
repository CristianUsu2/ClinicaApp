import { NextResponse } from "next/server";
import { db } from "../libs/database";

export async function POST(request) {
  const connection = await db();
  try {
    const { Nombre, Tipo, Cedula, Contra } = await request.json();
    const Estado = 1;
   

    const [result] = await connection.execute(
      "INSERT INTO usuarios (Nombre, Tipo, Cedula, Contra, Estado) VALUES (?, ?, ?, ?, ?)",
      [Nombre, Tipo, Cedula, Contra, Estado]
    );

    const insertId = result.insertId;
    const res = { Nombre, Tipo, Cedula, Contra, IdUsuario: insertId };
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }finally{
    await connection.end()
  }
}

export async function GET() {
  const connection = await db();
  try {
    const result = await connection.execute("SELECT * FROM usuarios");
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await connection.end();
  }
}
