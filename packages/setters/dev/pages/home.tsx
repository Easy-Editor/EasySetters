/**
 * 首页 - 显示所有 setter 概览
 */
import { Link } from 'react-router-dom'
import { demos } from '../utils/registry'

export function HomePage() {
  const basicDemos = demos.filter(d => d.group === 'basic')
  const groupDemos = demos.filter(d => d.group === 'group')

  return (
    <div className='space-y-8'>
      <section>
        <h2 className='mb-4 font-semibold text-lg'>基础设置器</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {basicDemos.map(({ name, slug, description }) => (
            <Link
              className='block rounded-lg border bg-card p-4 transition-colors hover:border-primary'
              key={slug}
              to={`/${slug}`}
            >
              <h3 className='mb-1 font-medium'>{name}</h3>
              {description ? <p className='text-muted-foreground text-sm'>{description}</p> : null}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className='mb-4 font-semibold text-lg'>分组设置器</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {groupDemos.map(({ name, slug, description }) => (
            <Link
              className='block rounded-lg border bg-card p-4 transition-colors hover:border-primary'
              key={slug}
              to={`/${slug}`}
            >
              <h3 className='mb-1 font-medium'>{name}</h3>
              {description ? <p className='text-muted-foreground text-sm'>{description}</p> : null}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
