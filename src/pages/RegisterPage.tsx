import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { isValidEmail, isValidPassword } from '../utils/validators'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail(email)) {
      setError('El email no es válido')
      return
    }
    if (!isValidPassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/tasks')
    } catch (err) {
      setError('No se pudo crear la cuenta, probá con otro email')
    }
  }

  return (
    <div>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleRegister}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Registrarse</button>
      </form>
      <p>
        ¿Ya tenés cuenta? <Link to='/login'>Iniciá sesión</Link>
      </p>
    </div>
  )
}

export default RegisterPage
