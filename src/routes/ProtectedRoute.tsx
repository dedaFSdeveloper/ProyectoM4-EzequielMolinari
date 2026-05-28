import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

interface Props {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuth()

  // mientras firebase verifica si hay usuario, no hacemos nada
  if (loading) return <p>Cargando...</p>

  // si no hay usuario logueado, mandamos al login
  if (!user) return <Navigate to='/login' />

  return children
}

export default ProtectedRoute
