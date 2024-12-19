import React from 'react';
import { useNavigate } from 'react-router-dom';

const PanierPage = ({ cart }) => {
    const navigate = useNavigate();
    const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Mon Panier</h2>
            {cart.length === 0 ? (
                <p className="text-center">Votre panier est vide.</p>
            ) : (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price} Dt</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4 className="text-end">
                        Prix Total: <span>{totalPrice} Dt</span>
                    </h4>
                    <div className="text-center mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/payment', { state: { totalPrice } })}
                        >
                            Payer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PanierPage;