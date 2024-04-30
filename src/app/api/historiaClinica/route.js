import { db } from "../libs/database.js";
import { NextResponse } from "next/server";

export async function GET() {
  const connection = await db();
  try {
    const request = await connection.execute(
      "SELECT * FROM historiaclinicas join usuarios on(historiaClinicas.usuarioIdUsuario =usuarios.IdUsuario)"
    );
    return NextResponse.json(request[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  } finally {
    await connection.end();
  }
}

export async function POST(request) {
  const connection = await db();
  try {
    const { RegistroMedicos, usuarioIdUsuario } = await request.json();
    const [result] = await connection.execute(
      "INSERT INTO historiaclinicas (RegistroMedicos, usuarioIdUsuario) VALUES (?, ?)",
      [RegistroMedicos, usuarioIdUsuario]
    );
    return NextResponse.json({
      RegistroMedicos,
      usuarioIdUsuario,
      Idhistoria: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally{
    await connection.end()
  }
}
