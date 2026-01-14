/**
 * 页面布局组件
 */
import { Outlet } from 'react-router-dom'
import { Nav } from './nav'
import { ModeToggle } from '../mode-toggle'

export function Layout() {
  return (
    <div className='dev-app'>
      <Nav />
      <div className='dev-content'>
        <header className='dev-header'>
          <h1>EasySetters Dev</h1>
          <ModeToggle />
        </header>
        <main className='dev-main'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
