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
    } catch {
      setError('No se pudo crear la cuenta, probá con otro email')
    }
  }

  return (
    <div className='page'>
      <div className='card'>
        
        <h2 style={{ marginBottom: '28px', fontSize: '22px' }}>Crear cuenta</h2>
        <form onSubmit={handleRegister}>
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
  Registrarse
</button>
          </div>
        </form>
        <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
          ¿Ya tenés cuenta?{' '}
          <Link to='/login'>Iniciá sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage