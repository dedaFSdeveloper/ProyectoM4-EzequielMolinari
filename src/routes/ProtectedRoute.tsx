import  type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

interface Props {
  children: ReactElement
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuth()

  if (loading) return <p>Cargando...</p>

  if (!user) return <Navigate to='/login' />

  return children
}

export default ProtectedRoute