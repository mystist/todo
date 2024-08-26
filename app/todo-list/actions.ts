'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getInstance } from '@/lib/todo-list'

export const updateTodo = async (todo: any, prevState: any, formData: FormData) => {
  const content = formData.get('content') as string

  const instance = await getInstance()
  await instance.updateTodo(todo.id, { content })

  revalidatePath(`/todo-list/${todo.id}/edit`)
}

export const createTodo = async (prevState: any, formData: FormData) => {
  const content = formData.get('content') as string

  if (!content) return

  const instance = await getInstance()
  await instance.createTodo(content)

  redirect('/todo-list')
}

export const deleteTodo = async (id: number) => {
  const instance = await getInstance()
  await instance.deleteTodo(id)

  revalidatePath('/todo-list')
}

export const setTodoStatus = async (todo: any, status: string) => {
  const instance = await getInstance()
  await instance.updateTodo(todo.id, { status })

  revalidatePath('/todo-list')
}
