'use client'

import Link from 'next/link'
import { useActionState } from 'react'

import Spinner from '@/components/Spinner'
import { classNames } from '@/utils'

import { createTodo } from '../actions'

export default function Home() {
  const [error, action, isPending] = useActionState(createTodo, null)

  return (
    <div>
      <h2 className="text-xl font-semibold">Create Todo</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Keep going! You are doing great!</p>

      <div className="mt-10">
        <form action={action} className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Content
            </label>
            <div className="mt-2">
              <textarea
                name="content"
                rows={3}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-3 flex text-sm leading-6 text-gray-600">
              <p>Tips: Markdown supported</p>
            </div>

            <div className="mt-12 flex items-center justify-end gap-x-6">
              <Link href="/todo-list" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className={classNames(
                  isPending ? 'cursor-not-allowed' : '',
                  'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                )}
              >
                {isPending ? <Spinner /> : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
