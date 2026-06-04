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
    } catch {
      setError('Email o contraseña incorrectos')
    }
  }

  return (
    <div className='page'>
      <div className='card'>

        <h2 style={{ marginBottom: '28px', fontSize: '22px' }}>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className='error-msg'>{error}</p>}
            <button type='submit' className='btn-primary' disabled={!email || !password}>
  Entrar
</button>
          </div>
        </form>
        <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
          ¿No tenés cuenta?{' '}
          <Link to='/register'>Registrate</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage