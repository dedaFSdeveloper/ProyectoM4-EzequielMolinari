import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useTasks from '../hooks/useTasks'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import TaskFilter from '../components/TaskFilter'
import { sendTaskEmail } from '../services/emailService'
import toast from 'react-hot-toast'
import type { Task } from '../types'

const TasksPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { tasks, loading, addTask, toggleTask, deleteTask, editTask } = useTasks(user?.uid ?? '')
  const [filtro, setFiltro] = useState<'todas' | 'pendientes' | 'completadas'>('todas')

  const handleAddTask = async (title: string, description: string, dueDate?: string, priority?: 'baja' | 'media' | 'alta') => {
    await addTask(title, description, dueDate, priority)
    toast.success('Tarea agregada')
    if (user?.email) {
      await sendTaskEmail(user.email, title)
    }
  }

  const tareasFiltradas: Task[] = tasks.filter((task) => {
    if (filtro === 'pendientes') return !task.completed
    if (filtro === 'completadas') return task.completed
    return true
  })

  const pendientes = tasks.filter((t) => !t.completed).length

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch {
      console.log('error al cerrar sesion')
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p style={{ fontFamily: 'var(--mono)', color: 'var(--green)', fontSize: '13px', letterSpacing: '2px' }}>
        cargando_
      </p>
    </div>
  )

  return (
    <div className='page'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <p className='tag'>// tareas</p>
          <h2 style={{ fontSize: '22px' }}>Mis Tareas</h2>
          <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: '4px' }}>
            {user?.email} · <span style={{ color: 'var(--green)' }}>{pendientes} pendientes</span>
          </p>
        </div>
        <button className='btn-ghost' onClick={handleLogout}>
          Salir
        </button>
      </div>

      <TodoForm onAdd={handleAddTask} />

      <p className='tag'>// lista ({tareasFiltradas.length})</p>
      <TaskFilter filtroActual={filtro} onChange={setFiltro} />

      {tareasFiltradas.length === 0 ? (
        <p style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '13px' }}>
          _ no hay tareas {filtro === 'todas' ? 'todavía' : filtro}
        </p>
      ) : (
        <TodoList tasks={tareasFiltradas} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      )}
    </div>
  )
}

export default TasksPage