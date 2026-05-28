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
    <div>
      <h3>Agregar tarea</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Titulo de la tarea'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Descripcion (opcional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type='submit'>Agregar</button>
      </form>
    </div>
  )
}

export default TodoForm