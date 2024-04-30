'use client';
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
export default function CrearAutorizacion() {
  const router= useRouter()
  const { register, reset, handleSubmit } = useForm();
  const [usuarioLocal, seUsuarioLocal]=useState()
 
  

  

  const onSubmit = async (values) => {
    
    values.usuarioIdUsuario=2
      const request = await axios.post("/api/autorizaciones", values);
      const data = await request.data;

      if (data.message != undefined) {
        AlertError(data.message);
      } else {
       AlertSuccess("Se registro correctamente")
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
              Crear solicitud
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={12} mt={2} mb={2}>
            <TextField
              id="Tipo"
              label="Tipo"
              type="text"
              fullWidth
             
              {...register("Tipo")}
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
