import { db } from "../libs/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { Descripcion, Resultado, Fecha, usuarioIdUsuario } =
      await request.json();
    const result = await db.query("INSERT INTO procedimientos SET ?", {
      Descripcion,
      Resultado,
      Fecha,
      usuarioIdUsuario,
    });
    return NextResponse.json({
      Descripcion,
      Resultado,
      Fecha,
      usuarioIdUsuario,
      IdProcedimiento: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}



export async function GET(){
  try{
     const result= await db.query("SELECT * FROM procedimientos")
     return NextResponse.json(result)
  }catch(error){
      return NextResponse.json({message: error.message})
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}
