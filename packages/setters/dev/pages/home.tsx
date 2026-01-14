/**
 * 首页 - 显示所有 setter 概览
 */
import { Link } from 'react-router-dom'
import { demos } from '../utils/registry'

export function HomePage() {
  const basicDemos = demos.filter(d => d.group === 'basic')
  const groupDemos = demos.filter(d => d.group === 'group')

  return (
    <div className='dev-home'>
      <h2>EasySetters 组件库</h2>

      <section className='dev-home-section'>
        <h3>基础设置器</h3>
        <div className='dev-home-grid'>
          {basicDemos.map(({ name, slug, description }) => (
            <Link className='dev-home-card' key={slug} to={`/${slug}`}>
              <h4>{name}</h4>
              {description ? <p>{description}</p> : null}
            </Link>
          ))}
        </div>
      </section>

      <section className='dev-home-section'>
        <h3>分组设置器</h3>
        <div className='dev-home-grid'>
          {groupDemos.map(({ name, slug, description }) => (
            <Link className='dev-home-card' key={slug} to={`/${slug}`}>
              <h4>{name}</h4>
              {description ? <p>{description}</p> : null}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
