import { useState } from 'react'

interface Props {
  onAdd: (title: string, description: string) => void
}

const TodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim() === '') {
      alert('El titulo no puede estar vacio')
      return
    }

    onAdd(title, description)
    setTitle('')
    setDescription('')
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
            placeholder='descripcion (opcional)'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type='submit' className='btn-primary' style={{ alignSelf: 'flex-start' }}>
            + Agregar
          </button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm