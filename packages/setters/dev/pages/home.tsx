/**
 * 首页 - 显示所有 setter 概览
 */
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { demos } from '../utils/registry'

export function HomePage() {
  const basicDemos = demos.filter(d => d.group === 'basic')
  const groupDemos = demos.filter(d => d.group === 'group')

  return (
    <div className='dev-home'>
      <div className='dev-home-intro'>
        <span className='dev-eyebrow'>EasyEditor / 属性设置</span>
        <h2>为真实组件属性而设计的紧凑设置器。</h2>
        <p>统一 32 px 控件节奏、清晰的键盘焦点，并沿用 EasyEditor 克制、中性的界面语言。</p>
      </div>

      <section className='dev-home-section'>
        <div className='dev-section-heading'>
          <h3>基础设置器</h3>
          <span className='dev-section-count'>{basicDemos.length} 项</span>
        </div>
        <div className='dev-component-index'>
          {basicDemos.map(({ name, slug, description }) => (
            <Link className='dev-index-row' key={slug} to={`/${slug}`}>
              <code>{name}</code>
              <span className='dev-index-description'>{description}</span>
              <ArrowUpRight aria-hidden='true' className='dev-index-arrow' />
            </Link>
          ))}
        </div>
      </section>

      <section className='dev-home-section'>
        <div className='dev-section-heading'>
          <h3>分组设置器</h3>
          <span className='dev-section-count'>{groupDemos.length} 项</span>
        </div>
        <div className='dev-component-index'>
          {groupDemos.map(({ name, slug, description }) => (
            <Link className='dev-index-row' key={slug} to={`/${slug}`}>
              <code>{name}</code>
              <span className='dev-index-description'>{description}</span>
              <ArrowUpRight aria-hidden='true' className='dev-index-arrow' />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
