import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setErrorMessage('Erreur lors du chargement des commandes.');
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();
            if (data.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                setErrorMessage('Impossible de mettre à jour le statut.');
            }
        } catch (error) {
            setErrorMessage('Erreur lors de la mise à jour du statut.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Gestion des Commandes</h2>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Montant</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.clientName}</td>
                            <td>{order.totalAmount} Dt</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => handleStatusChange(order._id, 'traitée')}
                                >
                                    Marquer comme traitée
                                </button>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleStatusChange(order._id, 'en cours')}
                                >
                                    Marquer en cours
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;