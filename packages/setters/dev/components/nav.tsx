/**
 * 侧边导航栏组件
 */
import { Link, useLocation } from 'react-router-dom'
import { demos } from '../utils/registry'

interface NavLinkProps {
  to: string
  children: React.ReactNode
  isActive: boolean
}

function NavLink({ to, children, isActive }: NavLinkProps) {
  return (
    <Link
      className={`block rounded px-3 py-1.5 text-sm transition-colors ${
        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
      }`}
      to={to}
    >
      {children}
    </Link>
  )
}

export function Nav() {
  const location = useLocation()
  const basicDemos = demos.filter(d => d.group === 'basic')
  const groupDemos = demos.filter(d => d.group === 'group')

  return (
    <nav className='w-48 shrink-0 space-y-4 border-r p-4'>
      <NavLink isActive={location.pathname === '/'} to='/'>
        概览
      </NavLink>

      <div>
        <div className='mb-2 font-medium text-muted-foreground text-xs'>基础设置器</div>
        <div className='space-y-1'>
          {basicDemos.map(d => (
            <NavLink isActive={location.pathname === `/${d.slug}`} key={d.slug} to={`/${d.slug}`}>
              {d.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <div className='mb-2 font-medium text-muted-foreground text-xs'>分组设置器</div>
        <div className='space-y-1'>
          {groupDemos.map(d => (
            <NavLink isActive={location.pathname === `/${d.slug}`} key={d.slug} to={`/${d.slug}`}>
              {d.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
