'use client'
import {
  Grid,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function home() {
  const router=useRouter()
  const usuario=JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <Container>
        <Grid container spacing={0} mt={10} justifyContent={"center"} alignItems={"center"} >
          {usuario.Tipo == "usuario" ? 
          <>
         <Grid xs={12} md={6} lg={4} xl={4} mt={3} mb={3} onClick={()=>router.push("/Citas")}>
           <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="240"
                 image="/images/undraw_doctor_kw-5-l.svg"
                 alt="citas"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   Citas
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Ingresa para asignar citas con tus especialistas o medico de
                   preferencia
                 </Typography>
               </CardContent>
             </CardActionArea>
           </Card>
         </Grid>

         <Grid xs={12} md={6} lg={4} xl={4} mt={3} mb={3} onClick={()=>router.push("/Medicamentos")}>
           <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="240"
                 image="/images/medicamentos.svg"
                 alt="citas"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   Medicamentos
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Ingresa para registrar la entrega de sus medicamentos
                 </Typography>
               </CardContent>
             </CardActionArea>
           </Card>
         </Grid>


         <Grid xs={12} md={6} lg={4} xl={4} mt={3} mb={3}  onClick={()=>router.push("/Examenes")}>
           <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="240"
                 image="/images/examenes.svg"
                 alt="citas"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   Examenes
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Ingresa para visualizar los examanes asignados por los profesionales
                 </Typography>
               </CardContent>
             </CardActionArea>
           </Card>
         </Grid>


         <Grid xs={12} md={6} lg={4} xl={4} mt={3} mb={3}  onClick={()=>router.push("/Autorizaciones")}>
           <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="240"
                 image="/images/undraw_book_lover_re_rwjy.svg"
                 alt="citas"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   Autorizaciones
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Ingresa para visualizar los examanes asignados por los profesionales
                 </Typography>
               </CardContent>
             </CardActionArea>
           </Card>
         </Grid>


         <Grid xs={12} md={6} lg={4} xl={4} mt={3} mb={3}  onClick={()=>router.push("/Procedimientos")}>
           <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="240"
                 image="/images/Procedimientos2.svg"
                 alt="citas"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   Procedimientos
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Ingresa para visualizar los examanes asignados por los profesionales
                 </Typography>
               </CardContent>
             </CardActionArea>
           </Card>
         </Grid>


         <Grid xs={12} md={6} lg={4} xl={4} mt={3} mb={3} onClick={()=>router.push("/HistoriaClinica")}>
           <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="240"
                 image="/images/historialClinica.svg"
                 alt="citas"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   Historia clinica
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Ingresa para visualizar los examanes asignados por los profesionales
                 </Typography>
               </CardContent>
             </CardActionArea>
           </Card>
         </Grid>
          </>
          : <>
            <Grid xs={12} md={6} lg={4} xl={4} mt={3} mb={3} onClick={()=>router.push("/Usuarios")}>
           <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="240"
                 image="/images/historialClinica.svg"
                 alt="citas"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   Usuarios
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Ingresa para visualizar los usuarios y puedes crear nuevos usuarios
                 </Typography>
               </CardContent>
             </CardActionArea>
           </Card>
         </Grid>


         <Grid xs={12} md={6} lg={4} xl={4} mt={3} mb={3} onClick={()=>router.push("/Medicos")}>
           <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="240"
                 image="/images/historialClinica.svg"
                 alt="citas"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   Profesionales
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Ingresa para visualizar los profesionales y registrar nuevos profesionales
                 </Typography>
               </CardContent>
             </CardActionArea>
           </Card>
         </Grid>
          </> }
         

        </Grid>
      </Container>
    </>
  );
}
