import React from 'react';
import { Box, Typography } from '@mui/material';
import MenuAppBar from "../app-bar/MenuAppBar";
import AddBookForm from "../add-book-form/AddBookForm";
import AddUserForm from "../add-user-form/AddUserForm";
import { useTranslation } from "react-i18next";

interface AdminPanelProps {
    isAdmin: boolean;
}

function AdminPanel({ isAdmin }: AdminPanelProps) {
    const { t } = useTranslation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>{t('Admin Panel')}</Typography>
                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <Box>
                        <Typography variant="h5">{t('Add Book Form')}</Typography>
                        <AddBookForm />
                    </Box>
                    <Box>
                        <Typography variant="h5">{t('Add User Form')}</Typography>
                        <AddUserForm />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminPanel;
