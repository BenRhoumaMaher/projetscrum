import React, { useState } from 'react';
import AddAccountModal from './AddAccountModal';

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddAccountClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="text-center">
            <button
                className="btn btn-primary"
                onClick={handleAddAccountClick}
            >
                Ajouter un compte
            </button>
            {isModalOpen && <AddAccountModal onClose={closeModal} />}
        </div>
    );
};

export default AdminDashboard;
