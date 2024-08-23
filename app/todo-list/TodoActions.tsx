'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useTransition } from 'react'

import Spinner from '@/components/Spinner'
import { classNames } from '@/utils'

import { deleteTodo, setTodoStatus } from './actions'

export default function Home({ item }: { item: any }) {
  const [isPending, startTransition] = useTransition()
  const [isSetToPending, startSetToTransition] = useTransition()

  return (
    <>
      {item.status !== 'Complete' && (
        <button
          disabled={isSetToPending}
          className={classNames(isSetToPending ? 'cursor-not-allowed opacity-50' : '', 'hidden rounded-md bg-white px-2.5 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block')}
          onClick={() => startSetToTransition(() => setTodoStatus(item, item.status === 'Todo' ? 'In progress' : 'Complete'))}
        >
          {isSetToPending ? <Spinner /> : item.status === 'Todo' ? 'Set to In Progress' : 'Set to Completed'}
        </button>
      )}
      <Menu as="div" className="relative flex-none">
        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <MenuItem>
            <a href={`/todo-list/${item.id}/edit`} className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
              Edit
            </a>
          </MenuItem>
          <MenuItem>
            <button onClick={() => startTransition(() => deleteTodo(item.id))} className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
              {isPending ? 'Deleting...' : 'Delete'}
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  )
}
