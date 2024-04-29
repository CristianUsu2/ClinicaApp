import { db } from "../libs/database.js";
import { NextResponse } from "next/server";

export async function GET(){
    try{
   const request=await db.query("SELECT * FROM historiaClinicas")
   return NextResponse.json(request)
    }catch(error){
        return NextResponse.json({message: error.message})
    }finally {
      // Cerrar la conexión al finalizar la ejecución del script
      await db.end();
    }
}

export async function POST(request){
    try {
      const {RegistroMedicos,usuarioIdUsuario }= await request.json()
      const res= await db.query("INSERT historiaClinicas SET ?",{
        RegistroMedicos,
        usuarioIdUsuario
      })
      return NextResponse.json({
        RegistroMedicos,
        usuarioIdUsuario,
        "Idhistoria":res.insertId
      })
      
     }catch(error){
       return NextResponse.json({message: error.message})
     }finally {
      // Cerrar la conexión al finalizar la ejecución del script
      await db.end();
    }
  }