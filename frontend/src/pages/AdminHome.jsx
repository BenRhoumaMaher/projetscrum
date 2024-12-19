import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    alert('Vous êtes déconnecté.')
    navigate('/admin/login')
  }
  return (
    <div className='container mt-5'>
      <AdminDashboard onLogout={handleLogout} />
    </div>
  )
}

export default AdminHome