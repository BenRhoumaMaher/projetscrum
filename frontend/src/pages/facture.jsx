import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FacturePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { invoice } = location.state || {};

    if (!invoice) {
        return (
            <div className="container mt-5 text-center">
                <h2>Pas de facture disponible.</h2>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Retourner à l'accueil
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Facture</h2>
            <div className="border p-4 rounded">
                <p><strong>ID Facture:</strong> {invoice.id}</p>
                <p><strong>Montant:</strong> {invoice.amount} Dt</p>
                <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Retourner à l'accueil
                </button>
            </div>
        </div>
    );
};

export default FacturePage;
