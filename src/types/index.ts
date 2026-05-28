// Tarea
export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  userId: string
}

// Usuario
export interface User {
  uid: string
  email: string | null
  displayName: string | null
}
