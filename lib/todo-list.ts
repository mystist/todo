import fs from 'fs/promises'
import path from 'path'

import { sleep } from '@/utils'

export interface Todo {
  id: number
  content: string
  status: string
  date: string
}

const TODO_LIST_FILE = path.join(process.cwd(), 'data', 'todo-list.json')

export class TodoList {
  private todoList: Todo[] = []

  constructor() {}

  async init() {
    await this.ensureFile()
    await this.loadTodoList()
  }

  private async ensureFile() {
    try {
      await fs.access(TODO_LIST_FILE)
    } catch (error) {
      await fs.mkdir(path.dirname(TODO_LIST_FILE), { recursive: true })
      await fs.writeFile(TODO_LIST_FILE, '[]')
    }
  }

  private async loadTodoList() {
    await sleep(100)
    const data = await fs.readFile(TODO_LIST_FILE, 'utf8')
    this.todoList = JSON.parse(data)
  }

  private async saveTodoList() {
    await fs.writeFile(TODO_LIST_FILE, JSON.stringify(this.todoList, null, 2))
  }

  async getTodoList(): Promise<Todo[]> {
    await this.loadTodoList()
    return this.todoList
  }

  async getTodoById(id: number): Promise<Todo | null> {
    await this.loadTodoList()

    const todo = this.todoList.find((todo) => todo.id === id)
    return todo || null
  }

  async createTodo(content: string): Promise<Todo> {
    const newTodo: Todo = {
      id: Date.now() % 100000,
      content,
      status: 'Todo',
      date: new Date().toISOString(),
    }
    this.todoList.push(newTodo)
    await this.saveTodoList()
    return newTodo
  }

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo | null> {
    await sleep(1000)

    const todoIndex = this.todoList.findIndex((todo) => todo.id === id)
    if (todoIndex === -1) return null

    this.todoList[todoIndex] = { ...this.todoList[todoIndex], ...updates, ...{ date: new Date().toISOString() } }
    await this.saveTodoList()

    return this.todoList[todoIndex]
  }

  async deleteTodo(id: number): Promise<boolean> {
    const initialLength = this.todoList.length
    this.todoList = this.todoList.filter((todo) => todo.id !== id)
    if (this.todoList.length !== initialLength) {
      await this.saveTodoList()
      return true
    }
    return false
  }
}

let todoListInstance: TodoList | null = null

export async function getInstance(): Promise<TodoList> {
  if (!todoListInstance) {
    todoListInstance = new TodoList()
    await todoListInstance.init()
  }
  return todoListInstance
}
