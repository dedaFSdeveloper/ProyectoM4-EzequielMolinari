import { useState } from 'react'

interface Props {
  onAdd: (title: string, description: string, dueDate?: string, priority?: 'baja' | 'media' | 'alta') => void
}

const TodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'baja' | 'media' | 'alta'>('media')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim() === '') {
      alert('El titulo no puede estar vacio')
      return
    }

    onAdd(title, description, dueDate, priority)
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('media')
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <p className='tag'>// nueva tarea</p>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='titulo'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
  type='text'
  placeholder='titulo'
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  maxLength={100}
/>
<p style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: title.length > 80 ? 'var(--danger)' : 'var(--muted)', textAlign: 'right', marginTop: '-8px' }}>
  {title.length}/100
</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type='date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{ flex: 1 }}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'baja' | 'media' | 'alta')}
              style={{
                flex: 1,
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--muted)',
                borderRadius: 'var(--radius)',
                padding: '11px 14px',
                color: 'var(--text)',
                fontFamily: 'var(--mono)',
                fontSize: '13px',
                outline: 'none',
              }}
            >
              <option value='baja'>baja</option>
              <option value='media'>media</option>
              <option value='alta'>alta</option>
            </select>
          </div>
          <button type='submit' className='btn-primary' style={{ alignSelf: 'flex-start' }} disabled={!title.trim()}>
  + Agregar
</button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm