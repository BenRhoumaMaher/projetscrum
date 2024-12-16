import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAccountsPage = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setAccounts(response.data);
            console.log(response.data);
            
        } catch (error) {
            console.error('Erreur lors de la récupération des comptes :', error);
        }
    };

    const deleteAccount = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/accounts/${id}`);
            alert('Compte supprimé avec succès.');
            setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du compte :', error);
            alert('Échec de la suppression. Veuillez réessayer.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Liste des comptes</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom d'utilisateur</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteAccount(account.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAccountsPage;