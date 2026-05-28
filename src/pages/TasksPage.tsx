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
    } catch (error) {
      console.log('error al cerrar sesion', error)
    }
  }

  if (loading) return <p>Cargando tareas...</p>

  return (
    <div>
      <h2>Mis Tareas</h2>
      <p>Hola, {user?.email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <TodoForm onAdd={addTask} />
      {tasks.length === 0 ? (
        <p>No tenés tareas todavía, agregá una!</p>
      ) : (
        <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      )}
    </div>
  )
}

export default TasksPage