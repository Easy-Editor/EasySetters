/**
 * 单个 setter 详情页
 */
import { Navigate, useParams } from 'react-router-dom'
import { getDemoBySlug } from '../utils/registry'

export function SetterPage() {
  const { slug } = useParams<{ slug: string }>()
  const demo = slug ? getDemoBySlug(slug) : null

  if (!demo) {
    return <Navigate replace to='/' />
  }

  const { name, description, Component } = demo

  return (
    <div className='max-w-2xl'>
      <div className='mb-6'>
        <h2 className='font-semibold text-xl'>{name}</h2>
        {description ? <p className='mt-1 text-muted-foreground'>{description}</p> : null}
      </div>
      <Component />
    </div>
  )
}
