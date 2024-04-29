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
import { AlertSuccess, AlertError } from "../../components/alert";
import {useRouter} from 'next/navigation'
export default function CrearCita() {
  const router= useRouter()
  const { register, reset, handleSubmit } = useForm();
  const [historia, setHistoria] = useState({});
  const [usuario, setUsuario]=useState('')
  useEffect(() => {
    ObtenerHistoriaClinica();
  }, []);

  const ObtenerHistoriaClinica = async () => {
    const usuarios=JSON.parse(localStorage.getItem("user"))
    if(usuarios == undefined || usuarios == null){
        router.push("/")
        localStorage.clear()
    }
    setUsuario(usuarios)
    const request = await axios.get("/api/historiaClinica");
    const data = await request.data;
    const historiaUser= data.filter(e=>e.IdHistoriaClinica ==1)
    setHistoria(historiaUser)

  };

  const onSubmit = async (values) => {
     values.CantidadDisponible=1
     values.historiaClinicaIdHistoriaClinica=1
      console.log("values", values)
    const request = await axios.post("/api/registroMedicamentos", values);
      const data = await request.data;

      if (data.message != undefined) {
        AlertError(data.message);
      } else {
        AlertSuccess("Se registro correctamente la cita");
        router.back()
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
              Medicamentos
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6} mt={2} mb={2}>
            <TextField
              id="Direccion"
              label="Direccion"
              type="text"
              fullWidth
              
              {...register("Direccion")}
              required
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6} mt={2} mb={2}>
            <TextField
              id="Descripcion"
              label="Descripcion"
              type="text"
              fullWidth
              
              {...register("Descripcion")}
              required
            />
          </Grid>

  
          

          <Grid item xs={12} md={6} lg={6} xl={6} mt={2} mb={2}>
            <TextField
              id="Fecha"
              label="Fecha de entrega"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
              {...register("Fecha")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6} mt={2} mb={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[{label: "Acetaminofen", value: "Acetaminofen" }]}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medicamento"
                  {...register("Medicamento")}
                  required
                />
              )}
            />
          </Grid>

          
          <Grid item xs={12} md={6} lg={6} xl={6} mt={2} mb={2}>
            <TextField
              id="Metodo"
              label="Metodo de pago"
              type="text"
              fullWidth
              
              {...register("MetodoDePago")}
              required
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
