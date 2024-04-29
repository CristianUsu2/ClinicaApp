"use client";
import axios from "axios";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import moment from "moment";

export default function Usuarios() {
  const [citasData, setCitasData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    Obtenerusuarios();
  }, []);

  const Obtenerusuarios = async () => {
    if(window != undefined && window != null && window != "undefined"){
      const request = await axios.get("/api/usuarios");
      const data = await request.data;
      

      setCitasData(data);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "IdUsuario",
        header: "Id",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
      {
        accessorKey: "Nombre",
        header: "Nombre",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
      {
        accessorKey: "Cedula",
        header: "Cedula",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
      {
        accessorKey: "Tipo",
        header: "Tipo",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
    ],
    []
  );

  return (
    <>
      <Container>
        <Grid container spacing={0} mt={10}>
          <Grid item xs={12}>
            <Typography
              component={"h2"}
              sx={{ fontSize: "25px", fontWeight: 300 }}
            >
              Usuarios
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => router.push("/Usuarios/Crear")}
          >
            Crear usuario
          </Button>
          <Button
            type="button"
            sx={{
              textTransform: "none",
              backgroundColor: "black",
              margin: 1,
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            variant="contained"
            onClick={() => router.back()}
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
    </>
  );
}
