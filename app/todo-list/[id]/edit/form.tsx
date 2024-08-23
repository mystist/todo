'use client'

import Link from 'next/link'
import { use, useActionState } from 'react'

import Spinner from '@/components/Spinner'
import { classNames } from '@/utils'

import { updateTodo } from '../../actions'

export default function Home({ todoPromise }: { todoPromise: Promise<object> }) {
  const todo: any = use(todoPromise)

  const [error, action, isPending] = useActionState(updateTodo.bind(null, todo), null)

  return (
    <form action={action} className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="col-span-full">
        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
          Content
        </label>
        <div className="mt-2">
          <textarea
            name="content"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={todo.content}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm leading-6 text-gray-600">
          <p>Tips: Markdown supported</p>
          <p className="whitespace-nowrap text-xs">
            Updated at <time dateTime={todo.date}>{new Date(todo.date).toLocaleString()}</time>
          </p>
        </div>

        <div className="mt-12 flex items-center justify-end gap-x-6">
          <Link href="/todo-list" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className={classNames(
              isPending ? 'cursor-not-allowed opacity-50' : '',
              'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            )}
          >
            {isPending ? <Spinner /> : 'Save'}
          </button>
        </div>
      </div>
    </form>
  )
}
