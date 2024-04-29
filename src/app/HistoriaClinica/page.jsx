"use client";
import axios from "axios";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import moment from "moment";

export default function historiaClinica() {
  const [medicamentos, setRegistroMedicamentos] = useState([]);
  const [usuario, setUsuario] = useState("");
  const router = useRouter();
  useEffect(() => {
    ObtenerCitas();
  }, []);

  const ObtenerCitas = async () => {
    const request = await axios.get("/api/historiaClinica");
    const data = await request.data;
    const usuario = JSON.parse(localStorage.getItem("user"));
    if (usuario == undefined || usuario == null) {
      router.push("/");
    }
    console.log("data", data)
    setUsuario(usuario);
    setRegistroMedicamentos(data);
  };

  return (
    <>
    {medicamentos.length != 0 ?     <Container>
        <Grid container spacing={1} mt={10} boxShadow={1} padding={5} sx={{height: "100%vh"}}>
          <Grid item xs={12}>
            <Typography
              component={"h2"}
              sx={{ fontSize: "25px", fontWeight: 300 }}
            >
              Historia clinica
            </Typography>
          </Grid>

          <Grid item xs={12} mt={2}>
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
              Regresar
            </Button>
          </Grid>

          <Grid item xs={12} md={12} lg={6} xl={6} mt={2}>
            <TextField
              disabled
              label="Paciente"
              fullWidth
              value={usuario.Nombre}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={6} xl={6} mt={2}>
            <TextField
              label="Cedula"
              disabled
              value={usuario.Cedula}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} mt={2}>
            <Typography
              component={"h5"}
              sx={{ fontSize: "22px", fontWeight: 300 }}
            >
              Diagnosticos
            </Typography>
          </Grid>
          {medicamentos.map(e=>(<Grid item xs={12}>
             <Typography component={"p"}>{e.RegistroMedicos}</Typography>
          </Grid>))}
          
        </Grid>
      </Container>: null}
  
    </>
  );
}
