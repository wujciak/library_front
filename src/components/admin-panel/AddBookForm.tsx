import React, { useCallback } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../../api/ApiProvider';
import { CreateBookDTO } from '../../api/dto/book.dto';
import {useTranslation} from "react-i18next";

function AddBookForm() {
    const apiClient = useApi();
    const { t } = useTranslation();

    const onSubmit = useCallback(
        (values: CreateBookDTO, formik: any) => {
            apiClient.createBook(values).then((response) => {
                if (response.success) {
                    formik.resetForm();
                } else {
                    console.error('Failed to create book');
                }
            });
        },
        [apiClient]
    );

    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        isbn: yup.string().required('ISBN is required'),
        publisher: yup.string().required('Publisher is required'),
        yearOfPublish: yup.number().required('Year of publish is required').positive().integer(),
        availableCopies: yup.number().required('Available copies is required').positive().integer()
    });

    return (
        <Formik
            initialValues={{
                title: '',
                author: '',
                isbn: '',
                publisher: '',
                yearOfPublish: 2020,
                availableCopies: 0
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            id="title"
                            label={t("Title")}
                            variant="outlined"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            error={formik.touched.title && !!formik.errors.title}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            id="author"
                            label={t("Author")}
                            variant="outlined"
                            name="author"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.author}
                            error={formik.touched.author && !!formik.errors.author}
                            helperText={formik.touched.author && formik.errors.author}
                        />
                        <TextField
                            id="isbn"
                            label="ISBN"
                            variant="outlined"
                            name="isbn"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.isbn}
                            error={formik.touched.isbn && !!formik.errors.isbn}
                            helperText={formik.touched.isbn && formik.errors.isbn}
                        />
                        <TextField
                            id="publisher"
                            label={t("Publisher")}
                            variant="outlined"
                            name="publisher"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.publisher}
                            error={formik.touched.publisher && !!formik.errors.publisher}
                            helperText={formik.touched.publisher && formik.errors.publisher}
                        />
                        <TextField
                            id="yearOfPublish"
                            label={t("Year of Publish")}
                            variant="outlined"
                            name="yearOfPublish"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.yearOfPublish}
                            error={formik.touched.yearOfPublish && !!formik.errors.yearOfPublish}
                            helperText={formik.touched.yearOfPublish && formik.errors.yearOfPublish}
                        />
                        <TextField
                            id="availableCopies"
                            label={t("Available Copies")}
                            variant="outlined"
                            name="availableCopies"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.availableCopies}
                            error={formik.touched.availableCopies && !!formik.errors.availableCopies}
                            helperText={formik.touched.availableCopies && formik.errors.availableCopies}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            {t("Add Book")}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default AddBookForm;
