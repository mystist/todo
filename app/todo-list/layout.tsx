import { ReactNode } from 'react'

export default function Home({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex max-w-screen-md flex-col p-12">{children}</main>
}
