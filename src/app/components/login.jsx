"use client";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios"
import {AlertSuccess, AlertError} from "./alert"
import { useRouter } from "next/navigation";
export const Login=()=> {
  const { register, reset, handleSubmit } = useForm();
  const [password, setPassword] = useState("password");
  const router=useRouter()
  useEffect(() => {}, []);
  const onSubmit = async(values) => {
     const request= await axios.post("/api/login", values)
     const data= await request.data
   
     if(data.message != undefined){
        AlertError(data.message) 
     }else{
        AlertSuccess("Usuario autenticado")
       
        router.push("/Home") 

     }
     
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Grid
            container
            spacing={0}
            boxShadow={2}
            mt={10}
            sx={{
              borderRadius: "10px",
              padding: "10px",
              width: "60%",
              marginLeft: "20%",
              paddingBottom: "30px",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
          >
            <Grid item xs={12}>
              <Typography
                component={"h2"}
                sx={{ fontSize: "25px", fontWeight: 300 }}
              >
                Inicio de sesión
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cedula"
                sx={{ width: "60%", marginTop: 2, marginBottom: 2 }}
                type="text"
                {...register("Cedula")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                sx={{ width: "60%", marginTop: 2, marginBottom: 2 }}
                type={password}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        password == "password"
                          ? setPassword("text")
                          : setPassword("password")
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  ),
                }}
                {...register("Contra")}
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
                  "&:hover": {
                    backgroundColor: "green",
                  },
                }}
                variant="contained"
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </>
  );
}
