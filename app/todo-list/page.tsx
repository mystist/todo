import Link from 'next/link'
import { Suspense, use } from 'react'

import { classNames } from '@/utils'

import TodoActions from './TodoActions'

const statuses = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  Todo: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  'In progress': 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
} as any

const quote = 'An apple a day keeps the doctor away'

const fetchQuote = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(quote)
    }, 1000)
  })
}

const fetchTodoList = async () => {
  const res = await fetch('http://localhost:3000/api/todo-list', { cache: 'no-store' })

  return await res.json()
}

const TodoList = () => {
  const todoList: any = use(fetchTodoList())

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {todoList.map((item: any) => (
        <li key={item.id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">{item.content}</p>
              <p className={classNames(statuses[item.status], 'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset')}>{item.status}</p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                Updated at <time dateTime={item.date}>{new Date(item.date).toLocaleString()}</time>
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <TodoActions item={item} />
          </div>
        </li>
      ))}
    </ul>
  )
}

const Quote = () => {
  const quote: any = use(fetchQuote())

  return <p className="flex items-center gap-x-2 text-sm leading-5 text-gray-500">{quote}</p>
}

export default async function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h5 className="text-xl font-semibold">Quote of the day</h5>
        <Suspense fallback={<div>Loading quote...</div>}>
          <Quote />
        </Suspense>
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold">Todo List</h5>
          <Link
            href="/todo-list/create"
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Todo
          </Link>
        </div>

        <Suspense fallback={<div>Loading todo list...</div>}>
          <TodoList />
        </Suspense>
      </div>
    </div>
  )
}
