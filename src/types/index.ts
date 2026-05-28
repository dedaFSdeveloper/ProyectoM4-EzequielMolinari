export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  userId: string
}

export interface AppUser {
  uid: string
  email: string | null
  displayName: string | null
}