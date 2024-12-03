import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

const AdminHome = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Accueil Administrateur</h1>
            <AdminDashboard />
        </div>
    );
};

export default AdminHome;
