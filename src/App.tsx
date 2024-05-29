import React from 'react';
import './App.css';
import LoginForm from "./components/login-form/LoginForm";
import ListOfBooks from "./components/list-of-books/ListOfBooks";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./components/home-page/HomePage";
import ListOfLoans from "./components/list-of-loans/ListOfLoans";
import ApiProvider from "./api/ApiProvider";
import AdminPanel from "./components/admin-panel/AdminPanel";
import { I18nextProvider } from "react-i18next";
import i18n from './i18n'

function App() {
  return (
      <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <ApiProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/login"/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/books" element={<ListOfBooks/>}/>
                    <Route path="/loans" element={<ListOfLoans/>}/>
                    <Route path="/admin" element={<AdminPanel/>}/>
                    <Route path="*" element={<h1>Error 404: Page Not Found</h1>}/>
                </Routes>
            </ApiProvider>
          </I18nextProvider>
      </BrowserRouter>
      )
}

export default App;
