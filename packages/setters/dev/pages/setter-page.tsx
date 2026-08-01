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
    <div className='dev-page'>
      <div className='dev-page-heading'>
        <span className='dev-eyebrow'>设置器参考</span>
        <h2>{name}</h2>
        {description ? <p className='dev-page-desc'>{description}</p> : null}
      </div>
      <Component />
    </div>
  )
}
