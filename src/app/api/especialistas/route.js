import { NextResponse } from "next/server";
import { db } from "../libs/database";

export async function POST(request) {
  try {
    const { Nombre, Especialidad } = await request.json();
    const result = await db.query("INSERT INTO especialistas SET ?", {
      Nombre,
      Especialidad,
    });
    return NextResponse.json({Nombre, Especialidad, IdEspecialista: result.insertId})
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}

export async function GET(){
    try{
       const result= await db.query("SELECT * FROM especialistas")
       return NextResponse.json(result)
    }catch(error){
        return NextResponse.json({message: error.message})
    }
}