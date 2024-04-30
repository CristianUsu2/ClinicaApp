import { NextResponse } from "next/server";
import { db } from "../libs/database";

export async function GET() {
  const connection = await db();
  try {
    const result = await connection.execute("select * from autorizaciones");
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  } finally {
    await connection.end();
  }
}

export async function POST(request) {
  const connection = await db();
  try {
    const { Tipo, usuarioIdUsuario } = await request.json();
    const Estado = "Por Aprobacion";
    const [result] = await connection.execute(
      "INSERT INTO autorizaciones (Tipo, usuarioIdUsuario, Estado) VALUES (?, ?, ?)",
      [Tipo, usuarioIdUsuario, Estado]
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally {
    await connection.end();
  }
}
