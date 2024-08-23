import { Suspense } from 'react'

import Form from './form'

const fetchTodo = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/todo-list?id=${id}`, { cache: 'no-store' })

  return await res.json()
}

export default function Home({ params }: { params: { id: string } }) {
  const todoPromise = fetchTodo(parseInt(params.id, 10))

  return (
    <div>
      <h2 className="text-xl font-semibold">Edit Todo</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Keep going! You are doing great!</p>

      <div className="mt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <Form todoPromise={todoPromise} />
        </Suspense>
      </div>
    </div>
  )
}
