/**
 * 页面布局组件
 */
import { Outlet } from 'react-router-dom'
import { Nav } from './nav'
import { ModeToggle } from '../mode-toggle'

export function Layout() {
  return (
    <div className='flex min-h-screen bg-background'>
      <Nav />
      <div className='flex flex-1 flex-col'>
        <header className='flex items-center justify-between border-b px-6 py-3'>
          <h1 className='font-bold text-lg'>EasySetters Dev</h1>
          <ModeToggle />
        </header>
        <main className='flex-1 overflow-auto p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
