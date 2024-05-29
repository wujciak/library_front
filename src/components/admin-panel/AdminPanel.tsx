import React from 'react';
import { Box, Typography } from '@mui/material';
import AddBookForm from "../add-book-form/AddBookForm";

function AdminPanel() {
    return (
        <Box>
            <Typography variant="h4">Admin Panel</Typography>
            <AddBookForm />
        </Box>
    );
}

export default AdminPanel;
