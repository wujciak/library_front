import React, { useState, MouseEvent } from "react";
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import TranslateIcon from '@mui/icons-material/Translate';

function MenuAppBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLangMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseLangMenu = () => {
        setAnchorElLang(null);
    };

    const handleNavClick = (path: string) => {
        navigate(path);
        handleCloseNavMenu();
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        handleCloseLangMenu();
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
                        <MenuItem onClick={() => handleNavClick('/books')}>{t('Books')}</MenuItem>
                        <MenuItem onClick={() => handleNavClick('/loans')}>{t('Loans')}</MenuItem>
                        <MenuItem onClick={() => handleNavClick('/admin')}>{t('Admin Panel')}</MenuItem>
                    </Menu>
                </Box>
                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} onClick={() => handleNavClick('/home')}>
                    {t('Library')}
                </Typography>
                <Box>
                    <IconButton
                        size="large"
                        aria-label="select language"
                        aria-controls="menu-appbar-lang"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleLangMenu}
                    >
                        <TranslateIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar-lang"
                        anchorEl={anchorElLang}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElLang)}
                        onClose={handleCloseLangMenu}
                    >
                        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                        <MenuItem onClick={() => changeLanguage('pl')}>Polski</MenuItem>
                    </Menu>
                </Box>
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
                        <MenuItem onClick={handleCloseUserMenu}>{t('Profile')}</MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>{t('Log Out')}</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MenuAppBar;
