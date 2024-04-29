'use client'
import axios from "axios"
import {Button, Container, Grid, Typography} from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {MaterialReactTable} from "material-react-table"
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import moment from "moment"

export default function citas(){
    const [citasData, setCitasData]= useState([])
    const router= useRouter()
    useEffect(()=>{
        ObtenerCitas()
    },[])

    const ObtenerCitas=async()=>{
      const request=await axios.get("/api/autorizaciones")
      const data= await request.data
      const usuario=JSON.parse(localStorage.getItem("user"))
      if(usuario == undefined || usuario == null){
       router.push("/")
      }
      if(data.length !=0){
      console.log(data, "data")
      const DataUser=data.filter(e=>e.usuarioIdUsuario == usuario.IdUsuario)
      setCitasData(DataUser)
      console.log(DataUser)
      }
    }

    const columns=useMemo(
        () => [
          {
            accessorKey: "IdAutorizacion",
            header: "Id",
            muiTableHeadCellProps: { sx: { color: "black" } },
           
          },
          {
            accessorKey: "Tipo",
            header: "Tipo",
            muiTableHeadCellProps: { sx: { color: "black" } },

           
          },
          {
            accessorKey: "Estado",
            header: "Estado",
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
                Autorizaciones
              </Typography>
            </Grid>
        </Grid>
        <Grid item xs={12} mt={2}>
            <Button variant="contained" sx={{textTransform: "none"}} onClick={()=>router.push("/Autorizaciones/Crear")}>Crear solicitud</Button>
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
          data={citasData}
          sx={{ width: 10 }}
          title="Citas"
          localization={MRT_Localization_ES}
        />

        </Grid>

      </Container>
   
   </>)
}