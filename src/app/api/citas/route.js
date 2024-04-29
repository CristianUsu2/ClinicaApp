import { db } from "../libs/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { Fecha, Hora, usuarioIdUsuario, especialistaIdEspecialista } =
      await request.json();
    const result = await db.query("INSERT INTO citas SET ?", {
      Fecha,
      Hora,
      usuarioIdUsuario,
      especialistaIdEspecialista,
    });
    return NextResponse.json({
      Fecha,
      Hora,
      usuarioIdUsuario,
      especialistaIdEspecialista,
      IdCita: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}

export async function GET(){
  try {
    const result = await db.query("SELECT * FROM citas join especialistas on(citas.especialistaIdEspecialista=especialistas.IdEspecialista)");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}
