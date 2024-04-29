'use client'
import axios from "axios";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import moment from "moment";

export default function Citas() {
  const [citasData, setCitasData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    ObtenerCitas();
  }, []);

  const ObtenerCitas = async () => {
    if(window != undefined && window != null && window != "undefined"){
      const request = await axios.get("/api/citas");
      const data = await request.data;
     
      const DataUser = data.filter(
        (e) => e.usuarioIdUsuario == 2
      );
      setCitasData(DataUser);
      console.log(DataUser);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "IdCita",
        header: "Id cita",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
      {
        accessorKey: "Fecha",
        header: "Fecha",
        muiTableHeadCellProps: { sx: { color: "black" } },
        Cell: ({ cell }) =>
          moment(String(cell.getValue())).format("YYYY-MM-DD"),
      },
      {
        accessorKey: "Hora",
        header: "Hora",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
      {
        accessorKey: "Nombre",
        header: "Doctor",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
      {
        accessorKey: "Especialidad",
        header: "Especialidad",
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
              Asignación de citas
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => router.push("/Citas/Crear")}
          >
            Crear cita
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
