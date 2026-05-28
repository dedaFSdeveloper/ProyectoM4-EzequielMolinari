import { Task } from '../types'

interface Props {
  tasks: Task[]
  onToggle: (taskId: string, completed: boolean) => void
  onDelete: (taskId: string) => void
}

const TodoList = ({ tasks, onToggle, onDelete }: Props) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => onToggle(task.id, task.completed)}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <p>{task.description}</p>
          <button onClick={() => onDelete(task.id)}>Borrar</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList