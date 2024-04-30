import { db } from "../libs/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  const connection = await db();
  try {
    const { Fecha, Hora, usuarioIdUsuario, especialistaIdEspecialista } =
      await request.json();
      const [result] = await connection.execute(
        "INSERT INTO citas (Fecha, Hora, usuarioIdUsuario, especialistaIdEspecialista) VALUES (?, ?, ?, ?)",
        [Fecha, Hora, usuarioIdUsuario, especialistaIdEspecialista]
      );
      const insertId = result.insertId;
    return NextResponse.json({
      Fecha,
      Hora,
      usuarioIdUsuario,
      especialistaIdEspecialista,
      IdCita: insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  } finally {
    await connection.end();
  }
}

export async function GET() {
  const connection = await db();
  try {
    const result = await connection.execute(
      "SELECT * FROM citas join especialistas on(citas.especialistaIdEspecialista=especialistas.IdEspecialista)"
    );
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  } finally {
    await connection.end();
  }
}
