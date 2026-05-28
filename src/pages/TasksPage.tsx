import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useTasks from '../hooks/useTasks'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const TasksPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks(user?.uid ?? '')

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch {
      console.log('error al cerrar sesion')
    }
  }

  if (loading) return <p style={{ padding: '60px 24px', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>cargando...</p>

  return (
    <div className='page'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <p className='tag'>MateCode // tareas</p>
          <h2 style={{ fontSize: '22px' }}>Mis Tareas</h2>
          <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: '4px' }}>
            {user?.email}
          </p>
        </div>
        <button className='btn-ghost' onClick={handleLogout}>
          Salir
        </button>
      </div>

      <TodoForm onAdd={addTask} />

      <p className='tag'>// lista ({tasks.length})</p>
      {tasks.length === 0 ? (
        <p style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '13px' }}>
          _ no hay tareas todavía
        </p>
      ) : (
        <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      )}
    </div>
  )
}

export default TasksPage