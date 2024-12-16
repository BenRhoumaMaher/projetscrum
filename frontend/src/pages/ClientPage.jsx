import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClientDashboard from '../components/ClientDashboard'; // Assurez-vous du bon chemin d'import

const ClientPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        alert('Vous êtes déconnecté.');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Espace Client</h2>
            <ClientDashboard onLogout={handleLogout}/>
        </div>
    );
};

export default ClientPage;