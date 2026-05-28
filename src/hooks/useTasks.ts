import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../services/firebase'
import type { Task } from '../types'

const useTasks = (userId: string) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // traemos solo las tareas del usuario logueado
    const q = query(collection(db, 'tasks'), where('userId', '==', userId))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tareasFirebase = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[]

      setTasks(tareasFirebase)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userId])

  // agregar tarea
  const addTask = async (title: string, description: string) => {
    await addDoc(collection(db, 'tasks'), {
      title,
      description,
      completed: false,
      createdAt: new Date(),
      userId,
    })
  }

  // marcar como completada
  const toggleTask = async (taskId: string, completed: boolean) => {
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, { completed: !completed })
  }

  // borrar tarea
  const deleteTask = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId)
    await deleteDoc(taskRef)
  }

  return { tasks, loading, addTask, toggleTask, deleteTask }
}

export default useTasks
