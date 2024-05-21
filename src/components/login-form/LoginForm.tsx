import React, {useCallback, useMemo} from 'react';
import {Button, TextField} from '@mui/material';
import './LoginForm.css';
import LoginIcon from '@mui/icons-material/Login';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigate} from "react-router-dom";
import {useApi} from "../../api/ApiProvider";


function LoginForm() {
    const navigate = useNavigate();
    const apiClient = useApi();

    const onSubmit = useCallback(
        (values: { username: string; password:string }, formik: any) => {
            apiClient.login(values).then((response) => {
                if (response.success) {
                    navigate('/home');
                } else {
                    formik.setFieldError('username', 'Invalid username or password');
                }
            });
        },
        [apiClient, navigate],
    );

    const validationSchema = useMemo(
        () => yup.object().shape({
            username: yup
                .string()
                .required('Required'),
            password: yup
                .string()
                .required('Required')
                .min(3, 'Password must be at least 3 characters'),
        }), []
    );

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
        >
            {(formik: any) => (
                <form
                    className="login-form"
                    id='signForm'
                    onSubmit={formik.handleSubmit}
                    noValidate
                >
                    <TextField
                        id="username"
                        label="Username"
                        variant="standard"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && !!formik.errors.username}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        sx={{bgcolor: 'grey'}}
                        variant="contained"
                        startIcon={<LoginIcon/>}
                        type="submit"
                        form="signForm"
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Sign in
                    </Button>
                </form>
            )}
        </Formik>
    );
}

export default LoginForm;
