import { db } from "../libs/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  const connection = await db();
  try {
    const {
      Descripcion,
      CantidadDisponible,
      Fecha,
      Medicamento,
      MetodoDePago,
      historiaClinicaIdHistoriaClinica,
      Direccion,
    } = await request.json();
    
    const [result] = await connection.execute(
      "INSERT INTO registroMedicamentos (Descripcion, CantidadDisponible, Fecha, Medicamento, MetodoDePago, historiaClinicaIdHistoriaClinica, Direccion) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [Descripcion, CantidadDisponible, Fecha, Medicamento, MetodoDePago, historiaClinicaIdHistoriaClinica, Direccion]
    );

    return NextResponse.json({
      IdRegistroMedicamento: result.insertId,
      Descripcion,
      CantidadDisponible,
      Fecha,
      Medicamento,
      MetodoDePago,
      historiaClinicaIdHistoriaClinica,
      Direccion,
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
    const request = await connection.execute(
      "SELECT * FROM registroMedicamentos join historiaClinicas on(registroMedicamentos.historiaClinicaIdHistoriaClinica=historiaClinicas.IdHistoriaClinica)"
    );
    return NextResponse.json(request[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  } finally {
    await connection.end();
  }
}
