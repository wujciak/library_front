import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import ApiProvider from './api/ApiProvider';
import LoginForm from './components/login-form/LoginForm';
import HomePage from './components/home-page/HomePage';
import ListOfBooks from './components/list-of-books/ListOfBooks';
import ListOfLoans from './components/list-of-loans/ListOfLoans';
import AdminPanel from './components/admin-panel/AdminPanel';

function App() {
    const token = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <I18nextProvider i18n={i18n}>
                <ApiProvider>
                    <Routes>
                        <Route path="/" element={token ? <Navigate to="/login" />: <Navigate to="/home" />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/home" element={token ? <HomePage />: <Navigate to="/home" />} />
                        <Route path="/books" element={token ? <ListOfBooks />: <Navigate to="/home" />} />
                        <Route path="/loans" element={token ? <ListOfLoans />: <Navigate to="/home" />} />
                        <Route path="/admin" element={token ? <AdminPanel />: <Navigate to="/home" />} />
                        <Route path="*" element={<h1>Error 404: Page Not Found</h1>} />
                    </Routes>
                </ApiProvider>
            </I18nextProvider>
        </BrowserRouter>
    );
}

export default App;
