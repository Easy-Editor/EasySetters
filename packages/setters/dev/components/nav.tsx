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
    <Link className={`dev-nav-link ${isActive ? 'active' : ''}`} to={to}>
      {children}
    </Link>
  )
}

export function Nav() {
  const location = useLocation()
  const basicDemos = demos.filter(d => d.group === 'basic')
  const groupDemos = demos.filter(d => d.group === 'group')

  return (
    <nav className='dev-nav'>
      <NavLink isActive={location.pathname === '/'} to='/'>
        概览
      </NavLink>

      <div className='dev-nav-section'>
        <div className='dev-nav-title'>基础设置器</div>
        {basicDemos.map(d => (
          <NavLink isActive={location.pathname === `/${d.slug}`} key={d.slug} to={`/${d.slug}`}>
            {d.name}
          </NavLink>
        ))}
      </div>

      <div className='dev-nav-section'>
        <div className='dev-nav-title'>分组设置器</div>
        {groupDemos.map(d => (
          <NavLink isActive={location.pathname === `/${d.slug}`} key={d.slug} to={`/${d.slug}`}>
            {d.name}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
