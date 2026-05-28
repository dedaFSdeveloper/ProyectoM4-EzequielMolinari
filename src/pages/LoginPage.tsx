import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { isValidEmail, isValidPassword } from '../utils/validators'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // validaciones antes de llamar a firebase
    if (!isValidEmail(email)) {
      setError('El email no es válido')
      return
    }
    if (!isValidPassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/tasks')
    } catch (err) {
      setError('Email o contraseña incorrectos')
    }
  }

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type='submit'>Entrar</button>
      </form>
      <p>
        ¿No tenés cuenta? <Link to='/register'>Registrate</Link>
      </p>
    </div>
  )
}

export default LoginPage
