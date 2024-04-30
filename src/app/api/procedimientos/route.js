import { db } from "../libs/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  const connection = await db();
  try {
    const { Descripcion, Resultado, Fecha, usuarioIdUsuario } =
      await request.json();
      const [result] = await connection.execute(
        "INSERT INTO procedimientos (Descripcion, Resultado, Fecha, usuarioIdUsuario) VALUES (?, ?, ?, ?)",
        [Descripcion, Resultado, Fecha, usuarioIdUsuario]
      );
      
    return NextResponse.json({
      Descripcion,
      Resultado,
      Fecha,
      usuarioIdUsuario,
      IdProcedimiento: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  } finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await connection.end();
  }
}

export async function GET() {
  const connection = await db();
  try {
    const result = await connection.execute("SELECT * FROM procedimientos");
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  } finally {
    await connection.end();
  }
}
