import React, { useState, MouseEvent } from "react";
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function MenuAppBar()  {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavClick = (path: string) => {
        navigate(path);
        handleCloseNavMenu();
    };

    return (
        <AppBar position="static" sx={{ bgcolor: 'grey' }}>
            <Toolbar>
                <Box>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleNavMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar-nav"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        <MenuItem onClick={() => handleNavClick('/books')}>Books</MenuItem>
                        <MenuItem onClick={() => handleNavClick('/loans')}>Loans</MenuItem>
                    </Menu>
                </Box>
                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} onClick={() => handleNavClick('/home')}>
                    Library Management System
                </Typography>
                <Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar-user"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleUserMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar-user"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>Log Out</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MenuAppBar;
