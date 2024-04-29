import { NextResponse } from "next/server";
import { db } from "../libs/database";

export async function GET() {
  try {
    const result = await db.query("select * from autorizaciones");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}

export async function POST(request){
  try {
    const {Tipo,usuarioIdUsuario}=await request.json()
    const Estado="Por Aprobacion"
    const result = db.query("INSERT autorizaciones SET ?",
  {
    Tipo,
    usuarioIdUsuario,
    Estado
  });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}
