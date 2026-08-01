/**
 * 页面布局组件
 */
import { Outlet } from 'react-router-dom'
import { ModeToggle } from '../mode-toggle'
import { Nav } from './nav'

export function Layout() {
  return (
    <div className='dev-app'>
      <Nav />
      <div className='dev-content'>
        <header className='dev-header'>
          <div>
            <span className='dev-header-kicker'>组件工作台</span>
            <h1>属性面板设置器</h1>
          </div>
          <ModeToggle />
        </header>
        <main className='dev-main'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
