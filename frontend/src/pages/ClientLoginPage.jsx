import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ClientLoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/client/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        alert('Connexion réussie!')
        navigate('/')
      } else {
        setError('Nom d’utilisateur ou mot de passe incorrect.')
      }
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez réessayer.')
    }
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Connexion Client</h2>
      <form onSubmit={handleSubmit} className='p-4 border rounded'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <div className='mb-3'>
          <label className='form-label'>Nom d’utilisateur</label>
          <input
            type='text'
            name='username'
            className='form-control'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Mot de passe</label>
          <input
            type='password'
            name='password'
            className='form-control'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary w-100'>
          Connexion
        </button>
      </form>
    </div>
  )
}

export default ClientLoginPage
