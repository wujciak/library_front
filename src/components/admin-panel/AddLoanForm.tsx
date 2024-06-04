import React, { useCallback } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../../api/ApiProvider';
import { CreateLoanDTO } from '../../api/dto/loan.dto';
import { useTranslation } from 'react-i18next';
import { Book } from '../../api/dto/book.dto';
import { User } from '../../api/dto/user.dto';

function AddLoanForm() {
    const apiClient = useApi();
    const { t } = useTranslation();

    const onSubmit = useCallback(
        (values: any, formik: any) => {
            const book = { title: values.bookTitle } as Book;
            const user = { name: values.username } as User;
            const loan: CreateLoanDTO = {
                book,
                user,
                dateOfStart: values.dateOfStart,
                dateOfEnd: values.dateOfEnd,
                dateOfReturn: values.dateOfReturn
            };

            apiClient.createLoan(loan).then((response) => {
                if (response.success) {
                    formik.resetForm();
                } else {
                    console.error('Failed to create loan');
                }
            });
        },
        [apiClient]
    );

    const validationSchema = yup.object().shape({
        bookTitle: yup.string().required('Book title is required'),
        username: yup.string().required('Username is required'),
        dateOfStart: yup.date().required('Start date is required'),
        dateOfEnd: yup.date().required('End date is required'),
        dateOfReturn: yup.date().notRequired()
    });

    return (
        <Formik
            initialValues={{
                bookTitle: '',
                username: '',
                dateOfStart: '',
                dateOfEnd: '',
                dateOfReturn: ''
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            id="bookTitle"
                            label={t("Book Title")}
                            variant="outlined"
                            name="bookTitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bookTitle}
                            error={formik.touched.bookTitle && !!formik.errors.bookTitle}
                            helperText={formik.touched.bookTitle && formik.errors.bookTitle}
                        />
                        <TextField
                            id="username"
                            label={t("Username")}
                            variant="outlined"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            error={formik.touched.username && !!formik.errors.username}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            id="dateOfStart"
                            label={t("Date of Start")}
                            variant="outlined"
                            name="dateOfStart"
                            type="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dateOfStart}
                            error={formik.touched.dateOfStart && !!formik.errors.dateOfStart}
                            helperText={formik.touched.dateOfStart && formik.errors.dateOfStart}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="dateOfEnd"
                            label={t("Date of End")}
                            variant="outlined"
                            name="dateOfEnd"
                            type="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dateOfEnd}
                            error={formik.touched.dateOfEnd && !!formik.errors.dateOfEnd}
                            helperText={formik.touched.dateOfEnd && formik.errors.dateOfEnd}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="dateOfReturn"
                            label={t("Date of Return")}
                            variant="outlined"
                            name="dateOfReturn"
                            type="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dateOfReturn}
                            error={formik.touched.dateOfReturn && !!formik.errors.dateOfReturn}
                            helperText={formik.touched.dateOfReturn && formik.errors.dateOfReturn}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            {t("Add Loan")}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default AddLoanForm;
