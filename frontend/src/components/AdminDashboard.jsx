import React, { useState } from 'react'
import AddAccountModal from './AddAccountModal'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const handleAddAccountClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='text-center'>
      <button
        className='btn btn-secondary me-2'
        onClick={() => navigate('/admin/accounts')}
      >
        Gestion des comptes
      </button>
      <button
        className='btn btn-danger me-2'
        onClick={() => navigate('/products')}
      >
        Gestion des produits
      </button>
      <button className='btn btn-primary' onClick={handleAddAccountClick}>
        Ajouter un compte
      </button>
      {isModalOpen && <AddAccountModal onClose={closeModal} />}
      <button
        onClick={() => navigate('/admin/add-product')}
        className='btn btn-success ms-2'
      >
        Ajouter un produit
      </button>
      <button
        className='btn btn-info ms-2'
        onClick={() => navigate('/admin/orders')}
      >
        Gestion des commandes
      </button>
    </div>
  )
}

export default AdminDashboard
