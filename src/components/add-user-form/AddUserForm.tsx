import React, { useCallback } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../../api/ApiProvider';
import { CreateUserDTO } from '../../api/dto/user.dto';

function AddUserForm() {
    const apiClient = useApi();

    const onSubmit = useCallback(
        (values: CreateUserDTO, formik: any) => {
            apiClient.createUser(values).then((response) => {
                if (response.success) {
                    formik.resetForm();
                } else {
                    console.error('Failed to create user');
                }
            });
        },
        [apiClient]
    );

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        age: yup.number().required('Age is required').positive().integer(),
        email: yup.string().email('Invalid email format').required('Email is required')
    });

    return (
        <Formik
            initialValues={{
                name: '',
                age: 0,
                email: ''
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            error={formik.touched.name && !!formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            id="age"
                            label="Age"
                            variant="outlined"
                            name="age"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.age}
                            error={formik.touched.age && !!formik.errors.age}
                            helperText={formik.touched.age && formik.errors.age}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.touched.email && !!formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Add User
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default AddUserForm;
