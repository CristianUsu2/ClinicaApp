"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Link
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Menu = () => {
  const router=useRouter()
  const [state, setState] = useState(false);
 
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar component="nav" sx={{ backgroundColor: "#007bb2", height: 54 }}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon
                onClick={() => {
                  setState(true);
                }}
              />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Clinica
            </Typography>
            <Drawer anchor="left" open={state} onClose={() => setState(false)}>
              <Box sx={{ width: 250 }} role="presentation" alignItems="center">
                <List>
                  <Link
                  onClick={()=>{router.push("/")}}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem key={"Cerrar sesion"} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setState(false);
                      }}
                    >
                      <ListItemText primary={"Cerrar sesion"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                   
                 

                  
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
