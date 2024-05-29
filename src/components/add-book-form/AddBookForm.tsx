import React, { useCallback } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../../api/ApiProvider';
import { CreateBookDTO } from '../../api/dto/book.dto';

function AddBookForm() {
    const apiClient = useApi();

    const onSubmit = useCallback(
        (values: CreateBookDTO, formik: any) => {
            apiClient.createBook(values).then((response) => {
                if (response.success) {
                    formik.resetForm();
                }
            });
        },
        [apiClient]
    );

    const validationSchema = yup.object().shape({
        isbn: yup.string().required('ISBN is required'),
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        publisher: yup.string().required('Publisher is required'),
        yearOfPublish: yup.number().required('Year of publish is required'),
        availableCopies: yup.number().required('Available copies is required')
    });

    return (
        <Formik
            initialValues={{
                isbn: '',
                title: '',
                author: '',
                publisher: '',
                yearOfPublish: 0,
                availableCopies: 0
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik: any) => (
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
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
                            id="title"
                            label="Title"
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
                            label="Author"
                            variant="outlined"
                            name="author"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.author}
                            error={formik.touched.author && !!formik.errors.author}
                            helperText={formik.touched.author && formik.errors.author}
                        />
                        <TextField
                            id="publisher"
                            label="Publisher"
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
                            label="Year of Publish"
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
                            label="Available Copies"
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
                            Add Book
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default AddBookForm;
