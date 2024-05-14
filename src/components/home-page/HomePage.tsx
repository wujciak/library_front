import {Box, Button} from "@mui/material";
import MenuAppBar from "../app-bar/MenuAppBar";
import {Link, Outlet} from "react-router-dom";

function HomePage() {
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
                    Books
                </Button>
                <Button variant="contained" component={Link} to='/loans' sx={{m: 1,bgcolor: 'grey'}}>
                    Loans
                </Button>
            </Box>
            <Outlet/>
        </Box>
    );
}

export default HomePage;