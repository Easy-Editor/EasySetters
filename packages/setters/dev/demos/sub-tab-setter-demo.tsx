/**
 * SubTabSetter Demo
 */
import { useState } from 'react'
import { ColorSetter, NumberSetter, StringSetter, SubTabSetter, SwitchSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

// biome-ignore lint/suspicious/noEmptyBlockStatements: mock function
const noop = () => {}

export function SubTabSetterDemo() {
  const [textValue, setTextValue] = useState('文本内容')
  const [fontSizeValue, setFontSizeValue] = useState(16)
  const [colorValue, setColorValue] = useState('#ffffff')
  const [boldValue, setBoldValue] = useState(false)

  return (
    <SetterDemo description='用于组件配置的小 Tab 分类，比 TabSetter 更紧凑' title='SubTabSetter - 子标签页容器'>
      <SubTabSetter
        field={{ id: 'subtabs', title: '组件配置', config: { key: 'subtabs', title: '组件配置' } }}
        initialValue='content'
        onChange={noop}
        onInitial={noop}
        removeProp={noop}
        selected={{}}
        value={undefined}
      >
        {/* 内容 Tab */}
        <div key='content-tab' {...({ field: { config: { key: 'content', title: '内容' } } } as Record<string, unknown>)}>
          <div className='space-y-3'>
            <div>
              <span className='mb-1 block text-muted-foreground text-xs'>文本内容</span>
              <StringSetter {...createSetterProps(textValue, setTextValue, { id: 'text', title: '文本' })} />
            </div>
          </div>
        </div>
        {/* 字体 Tab */}
        <div key='font-tab' {...({ field: { config: { key: 'font', title: '字体' } } } as Record<string, unknown>)}>
          <div className='space-y-3'>
            <div>
              <span className='mb-1 block text-muted-foreground text-xs'>字体大小</span>
              <NumberSetter {...createSetterProps(fontSizeValue, setFontSizeValue, { id: 'fontSize', title: '字体大小' })} suffix='px' />
            </div>
            <div>
              <span className='mb-1 block text-muted-foreground text-xs'>颜色</span>
              <ColorSetter {...createSetterProps(colorValue, setColorValue, { id: 'color', title: '颜色' })} />
            </div>
          </div>
        </div>
        {/* 效果 Tab */}
        <div key='effect-tab' {...({ field: { config: { key: 'effect', title: '效果' } } } as Record<string, unknown>)}>
          <div className='space-y-3'>
            <div>
              <span className='mb-1 block text-muted-foreground text-xs'>粗体</span>
              <SwitchSetter {...createSetterProps(boldValue, setBoldValue, { id: 'bold', title: '粗体' })} />
            </div>
          </div>
        </div>
      </SubTabSetter>
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'SubTabSetter',
  slug: 'sub-tab-setter',
  group: 'group' as const,
  order: 3,
  description: '子标签页分组容器',
}

export default SubTabSetterDemo
