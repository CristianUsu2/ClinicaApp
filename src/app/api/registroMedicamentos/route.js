import { db } from "../libs/database";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
      const {Descripcion, CantidadDisponible, Fecha,Medicamento,MetodoDePago,historiaClinicaIdHistoriaClinica,Direccion}=await request.json()
      const result= await db.query("INSERT INTO registroMedicamentos SET ?",{
        Descripcion,
        CantidadDisponible,
        Fecha,
        Medicamento,
        MetodoDePago,
        historiaClinicaIdHistoriaClinica,
        Direccion
      })
      return NextResponse.json({
        IdRegistroMedicamento: result.insertId,
        Descripcion,
        CantidadDisponible,
        Fecha,
        Medicamento,
        MetodoDePago,
        historiaClinicaIdHistoriaClinica,
        Direccion
      })
    }catch(error){
        return NextResponse.json({message: error.message})
    }finally {
      // Cerrar la conexión al finalizar la ejecución del script
      await db.end();
    }
}

export async function GET(){
  try{
 const request=await db.query("SELECT * FROM registroMedicamentos join historiaClinicas on(registroMedicamentos.historiaClinicaIdHistoriaClinica=historiaClinicas.IdHistoriaClinica)")
 return NextResponse.json(request)
  }catch(error){
      return NextResponse.json({message: error.message})
  }
}