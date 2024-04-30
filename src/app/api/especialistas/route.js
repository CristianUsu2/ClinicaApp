import { NextResponse } from "next/server";
import { db } from "../libs/database";

export async function POST(request) {
  const connection = await db();
  try {
    const { Nombre, Especialidad } = await request.json();
    const [result] = await connection.execute(
      "INSERT INTO especialistas (Nombre, Especialidad) VALUES (?, ?)",
      [Nombre, Especialidad]
    );
    return NextResponse.json({Nombre, Especialidad, IdEspecialista: result.insertId})
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await connection.end();
  }
}

export async function GET(){
  const connection = await db();
    try{
       const result= await connection.execute("SELECT * FROM especialistas")
       return NextResponse.json(result[0])
    }catch(error){
        return NextResponse.json({message: error.message})
    }finally{
      await connection.end()
    }
}