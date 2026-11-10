import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ProfilePhoto from "../Photos/profile-photo.jpg";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const drawerWidth = 240;

export const toSectionId = (item) =>
  item.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function DrawerAppBar(props) {
  const navBarItems = props.navBarItems || [],
    [mobileOpen, setMobileOpen] = useState(false),
    [urlRoot, setUrlState] = useState(null),
    handleDrawerToggle = () => setMobileOpen((prevState) => !prevState),
    drawer = urlRoot && (
      <Box
        onClick={handleDrawerToggle}
        sx={{ textAlign: "center" }}
        className="mt-[5em]"
      >
        <div className="flex flex-col items-center">
          <Image
            src={ProfilePhoto}
            width={150}
            height={150}
            id="profile-photo"
            alt="Profile Photo"
          />
        </div>
        <Divider />
        <List className="nav-bar-hamburger">
          {navBarItems.map((item) => (
            <Link
              key={item}
              href={`${urlRoot}/#${toSectionId(item)}`}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    );

  useEffect(() => {
    setUrlState(window.location.origin);
  }, []);

  return (
    <Box className="nav-bar" sx={{ display: "flex", textAlign: "center" }}>
      <div>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="nav-bar-vertical flex flex-col items-center">
            <Image
              src={ProfilePhoto}
              width={175}
              height={175}
              id="profile-photo"
              alt="Profile Photo"
            />
            <Divider />
            {navBarItems.map((item) => (
              <Link
                key={item}
                href={`${urlRoot}/#${toSectionId(item)}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    color: "inherit",
                    margin: "0.25em 0",
                  }}
                >
                  {item}
                </Button>
              </Link>
            ))}
          </div>
        </Toolbar>
      </div>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
