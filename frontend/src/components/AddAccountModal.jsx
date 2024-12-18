import React, { useState } from 'react';
import axios from 'axios';
import ModalContent from '../pages/AddAccountContent';

const AddAccountModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nom: '',
        prenom: '',
        adresse: '',
        ville: '',
        tel: '',
        mail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/add', formData);
            console.log('Réponse API :', response.data);
            alert('Compte administrateur créé avec succès !');
            onClose();
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
            alert('Échec de la création du compte.');
        }
    };

    return (
        <ModalContent
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onClose={onClose}
        />
    );
};

export default AddAccountModal;