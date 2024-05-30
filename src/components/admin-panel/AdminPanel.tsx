import React from 'react';
import { Box, Typography } from '@mui/material';
import AddBookForm from "../add-book-form/AddBookForm";
import AddUserForm from "../add-user-form/AddUserForm";

function AdminPanel() {
    return (
        <Box>
            <Typography variant="h4">Admin Panel</Typography>
            <AddBookForm />
            <AddUserForm />
        </Box>
    );
}

export default AdminPanel;
