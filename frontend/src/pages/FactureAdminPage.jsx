import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const FactureAdminPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { facture } = location.state || {}

  if (!facture) {
    return (
      <div className='container mt-5 text-center'>
        <h2>Pas de facture disponible.</h2>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/admin/orders')}
        >
          Retourner à la gestion des commandes
        </button>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob(
      [
        `
                Facture
                ID: ${facture.id}
                Montant: ${facture.amount} Dt
                Date: ${new Date(facture.date).toLocaleDateString()}
                `
      ],
      { type: 'text/plain' }
    )
    element.href = URL.createObjectURL(file)
    element.download = `Facture-${facture.id}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Facture (Administrateur)</h2>
      <div className='border p-4 rounded'>
        <p>
          <strong>ID Facture:</strong> {facture.id}
        </p>
        <p>
          <strong>Montant:</strong> {facture.amount} Dt
        </p>
        <p>
          <strong>Date:</strong> {new Date(facture.date).toLocaleDateString()}
        </p>
      </div>
      <div className='text-center mt-4'>
        <button className='btn btn-secondary me-3' onClick={handlePrint}>
          Imprimer Facture
        </button>
        <button className='btn btn-success' onClick={handleDownload}>
          Télécharger Facture
        </button>
      </div>
      <div className='text-center mt-4'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/admin/orders')}
        >
          Retourner à la gestion des commandes
        </button>
      </div>
    </div>
  )
}

export default FactureAdminPage
