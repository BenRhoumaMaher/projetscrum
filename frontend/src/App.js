import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './pages/AdminHome';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminHome />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
