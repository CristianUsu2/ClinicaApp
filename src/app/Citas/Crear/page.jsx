"use client";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { AlertSuccess,AlertError} from "../../components/alert";
import {useRouter} from 'next/navigation'
export default function CrearCita() {
  const router= useRouter()
  const { register, reset, handleSubmit } = useForm();
  const [medicos, setMedicos] = useState([]);
  const [usuario, setUsuario] = useState("");
  useEffect(() => {
    ObtenerMedicos();
  }, []);

  const ObtenerMedicos = async () => {
    const request = await axios.get("/api/especialistas");
    const data = await request.data;
    const usuarioInicio = JSON.parse(localStorage.getItem("user"));
    const DataOptions = data.map((e) => ({
      label: `${e.Nombre}-${e.Especialidad}`,
      value: e.IdEspecialista,
      Nombre: e.Nombre,
    }));
    setMedicos(DataOptions);
    setUsuario(usuarioInicio);
  };

  const onSubmit = async (values) => {
    const NombreMedico = String(values.Medico).split("-")[0];
    console.log("nombre medico", NombreMedico);
    const FindMedico = medicos.filter((e) => e.Nombre == NombreMedico);
    if (FindMedico.length != 0) {
      const ObjectCita = {
        Fecha: values.Fecha,
        Hora: values.Hora,
        usuarioIdUsuario: usuario.IdUsuario,
        especialistaIdEspecialista: FindMedico[0].value,
      };

      const request = await axios.post("/api/citas", ObjectCita);
      const data = await request.data;

      if (data.message != undefined) {
        AlertError(data.message);
      } else {
        AlertSuccess("Se registro correctamente la cita");
        //localStorage.setItem("user", JSON.stringify(data[0]));
        router.back()
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Grid
          container
          spacing={1}
          mt={10}
          boxShadow={1}
          sx={{ padding: "40px" }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12} mt={2} mb={2}>
            <Typography
              component={"h2"}
              sx={{ fontSize: "25px", fontWeight: 300 }}
            >
              Crear cita
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6} mt={2} mb={2}>
            <TextField
              id="fecha"
              label="Fecha"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("Fecha")}
              required
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6} mt={2} mb={2}>
            <TextField
              id="fecha"
              label="Hora"
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
              {...register("Hora")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6} mt={2} mb={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={medicos}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medicos"
                  {...register("Medico")}
                  required
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              sx={{
                textTransform: "none",
                backgroundColor: "#1D8348",
                width: "200px",
                height: "35px",
                margin:1,
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
              variant="contained"
            >
              Enviar
            </Button>

            <Button
              type="button"
              sx={{
                textTransform: "none",
                backgroundColor: "black",
                width: "200px",
                height: "35px",
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
        </Grid>
      </Container>
    </form>
  );
}
