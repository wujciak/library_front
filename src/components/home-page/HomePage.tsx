import {Box, Button} from "@mui/material";
import MenuAppBar from "../app-bar/MenuAppBar";
import {Link, Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";


function HomePage() {
    const { t } = useTranslation();
    return (
        <Box sx={{flexGrow: 1}}>
            <MenuAppBar/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px',
                }}
            >
                <Button variant="contained" component={Link} to='/books' sx={{m: 1,bgcolor: 'grey'}}>
                    {t('Books')}
                </Button>
                <Button variant="contained" component={Link} to='/loans' sx={{m: 1,bgcolor: 'grey'}}>
                    {t('Loans')}
                </Button>
            </Box>
            <Outlet/>
        </Box>
    );
}

export default HomePage;