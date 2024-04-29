import { NextResponse } from "next/server";
import { db } from "../libs/database";

export async function GET(){
  try {
   const res= await db.query("select * from examenes")
   return NextResponse.json(res)
  }catch(error){
    return NextResponse.json({message: error.message})
  }finally {
    // Cerrar la conexión al finalizar la ejecución del script
    await db.end();
  }
}

