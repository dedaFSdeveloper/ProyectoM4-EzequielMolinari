interface Props {
  filtroActual: 'todas' | 'pendientes' | 'completadas'
  onChange: (filtro: 'todas' | 'pendientes' | 'completadas') => void
}

const TaskFilter = ({ filtroActual, onChange }: Props) => {
  const filtros = ['todas', 'pendientes', 'completadas'] as const

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
      {filtros.map((filtro) => (
        <button
          key={filtro}
          onClick={() => onChange(filtro)}
          className={filtroActual === filtro ? 'btn-primary' : 'btn-ghost'}
          style={{ padding: '6px 14px', fontSize: '11px' }}
        >
          {filtro}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter