import { NextResponse } from 'next/server'

import { sleep } from '@/utils'

import { getInstance } from '../../../lib/todo-list'

export async function GET(request: Request) {
  const instance = await getInstance()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    await sleep(1000)

    const todoId = parseInt(id, 10)
    if (isNaN(todoId)) {
      return NextResponse.json({ error: 'Invalid todo id' }, { status: 400 })
    }
    const todo = await instance.getTodoById(todoId)
    if (todo) {
      return NextResponse.json(todo)
    } else {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
  } else {
    await sleep(2000)

    const todoList = await instance.getTodoList()
    return NextResponse.json(todoList)
  }
}

export async function POST(request: Request) {
  const instance = await getInstance()
  const { content, status } = await request.json()

  if (typeof content !== 'string' || !content.trim() || typeof status !== 'string') {
    return NextResponse.json({ error: 'Invalid todo data' }, { status: 400 })
  }

  const newTodo = await instance.createTodo(content)
  return NextResponse.json(newTodo, { status: 201 })
}

export async function PUT(request: Request) {
  const instance = await getInstance()
  const { id, updates } = await request.json()

  if (typeof id !== 'number' || typeof updates !== 'object') {
    return NextResponse.json({ error: 'Invalid update data' }, { status: 400 })
  }

  const updatedTodo = await instance.updateTodo(id, updates)
  if (updatedTodo) {
    return NextResponse.json(updatedTodo)
  } else {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }
}

export async function DELETE(request: Request) {
  const instance = await getInstance()
  const { id } = await request.json()

  if (typeof id !== 'number') {
    return NextResponse.json({ error: 'Invalid todo id' }, { status: 400 })
  }

  const deleted = await instance.deleteTodo(id)
  if (deleted) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }
}
