import type { Task } from '../types'

interface Props {
  tasks: Task[]
  onToggle: (taskId: string, completed: boolean) => void
  onDelete: (taskId: string) => void
}

const coloresPrioridad = {
  alta: '#ff4444',
  media: '#f5e642',
  baja: '#39ff6e',
}

const TodoList = ({ tasks, onToggle, onDelete }: Props) => {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderLeft: `3px solid ${task.completed ? 'var(--muted)' : coloresPrioridad[task.priority ?? 'media']}`,
            borderRadius: 'var(--radius)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => onToggle(task.id, task.completed)}
            style={{
              width: '16px',
              marginTop: '3px',
              accentColor: 'var(--green)',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '14px',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'var(--muted)' : 'var(--text)',
              }}
            >
              {task.title}
            </p>
            {task.description && (
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                {task.description}
              </p>
            )}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <span style={{
                fontSize: '11px',
                fontFamily: 'var(--mono)',
                color: coloresPrioridad[task.priority ?? 'media'],
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {task.priority ?? 'media'}
              </span>
              {task.dueDate && (
                <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  vence: {task.dueDate}
                </span>
              )}
            </div>
          </div>
          <button className='btn-danger' onClick={() => onDelete(task.id)}>
            borrar
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList