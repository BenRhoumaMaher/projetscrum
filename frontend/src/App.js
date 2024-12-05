import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import AdminAccountsPage from './pages/AdminAccountsPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/accounts" element={<AdminAccountsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
