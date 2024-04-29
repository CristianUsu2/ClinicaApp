import { NextResponse } from "next/server";
import { db } from "../libs/database";

export async function POST(request) {
  try {
    const { Nombre, Tipo, Cedula, Contra } = await request.json();
    const Estado = 1;
    const result = await db.query("INSERT INTO usuarios SET ?", {
      Nombre,
      Tipo,
      Cedula,
      Contra,
      Estado,
    });
    const res = { Nombre, Tipo, Cedula, Contra, IdUsuario: result.insertId };
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}


export async function GET() {
  try {
    
    const result = await db.query("SELECT * FROM usuarios");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}

