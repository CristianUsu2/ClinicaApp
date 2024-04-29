'use client'
import axios from "axios"
import {Button, Container, Grid, Typography} from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {MaterialReactTable} from "material-react-table"
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import moment from "moment"

export default function Medicos(){
    const [medicosData, setmedicosData]= useState([])
    const router= useRouter()
    useEffect(()=>{
        ObtenerMedicos()
    },[])

    const ObtenerMedicos=async()=>{
        if(window != undefined && window != null && window != "undefined"){
      const request=await axios.get("/api/especialistas")
      const data= await request.data
      
      setmedicosData(data)
    }
    }

    const columns=useMemo(
        () => [
          {
            accessorKey: "IdEspecialista",
            header: "Id",
            muiTableHeadCellProps: { sx: { color: "black" } },
           
          },
          {
            accessorKey: "Nombre",
            header: "Nombre",
            muiTableHeadCellProps: { sx: { color: "black" } },
           
           
          },
          {
            accessorKey: "Especialidad",
            header: "Especialidad",
            muiTableHeadCellProps: { sx: { color: "black" } },
           
          },
         
        
        ],
        []
      )

   return (
   <>
      <Container>
        <Grid container spacing={0} mt={10}>
        <Grid item xs={12}>
              <Typography
                component={"h2"}
                sx={{ fontSize: "25px", fontWeight: 300 }}
              >
                Profesionales
              </Typography>
            </Grid>
        </Grid>
        <Grid item xs={12} mt={2}>
            <Button variant="contained" sx={{textTransform: "none"}} onClick={()=>router.push("/Medicos/Crear")}>Crear profesional</Button>
            <Button
              type="button"
              sx={{
                textTransform: "none",
                backgroundColor: "black",
                margin:1,
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              variant="contained"
              onClick={()=>router.back()}
            >
              Cancelar
            </Button>
        </Grid>
        <Grid item xs={12} mt={2}>
        <MaterialReactTable
          columns={columns}
          data={medicosData}
          sx={{ width: 10 }}
          title="Citas"
          localization={MRT_Localization_ES}
        />

        </Grid>

      </Container>
   
   </>)
}