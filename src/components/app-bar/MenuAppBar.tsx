import React, {useState} from "react";
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Box} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AccountCircle} from "@mui/icons-material";

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{bgcolor: 'grey'}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    /* onClick={some menu} */
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}}>
                    Library Management System
                </Typography>
                <Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMenu}
                        >
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}