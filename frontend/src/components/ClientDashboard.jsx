import React from 'react';

const ClientDashboard = ({ onLogout, onCloseAccount }) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary mb-3" onClick={onLogout}>
                Se déconnecter
            </button>
        </div>
    );
};

export default ClientDashboard;