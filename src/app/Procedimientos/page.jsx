'use client'
import axios from "axios"
import {Button, Container, Grid, Typography} from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {MaterialReactTable} from "material-react-table"
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import moment from "moment"

export default function registroMedicamentos(){
    const [medicamentos, setRegistroMedicamentos]= useState([])
    const router= useRouter()
    useEffect(()=>{
        ObtenerCitas()
    },[])

    const ObtenerCitas=async()=>{
      const request=await axios.get("/api/procedimientos")
      const data= await request.data
      const usuario=JSON.parse(localStorage.getItem("user"))
      if(usuario == undefined || usuario == null){
       router.push("/")
      }
      setRegistroMedicamentos(data)
      
    }

    const columns=useMemo(
        () => [
          {
            accessorKey: "IdProcedimiento",
            header: "Id",
            muiTableHeadCellProps: { sx: { color: "black" } },
           
          },
          {
            accessorKey: "Fecha",
            header: "Fecha",
            muiTableHeadCellProps: { sx: { color: "black" } },
            Cell: ({ cell }) => moment(String(cell.getValue())).format('YYYY-MM-DD')
           
          },
          {
            accessorKey: "Descripcion",
            header: "Descripcion",
            muiTableHeadCellProps: { sx: { color: "black" } },
           
          },
          {
            accessorKey: "Resultado",
            header: "Resultado",
            muiTableHeadCellProps: { sx: { color: "black" } }
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
                Listado de Procedimientos
              </Typography>
            </Grid>
        </Grid>
        <Grid item xs={12} mt={2}>
          
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
              Regresar
            </Button>
        </Grid>
        <Grid item xs={12} mt={2}>
        <MaterialReactTable
          columns={columns}
          data={medicamentos}
          sx={{ width: 10 }}
          title="Citas"
          localization={MRT_Localization_ES}
        />

        </Grid>

      </Container>
   
   </>)
}