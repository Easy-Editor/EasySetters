/**
 * TabSetter Demo
 */
import { useState } from 'react'
import { ColorSetter, NumberSetter, StringSetter, SwitchSetter, TabSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createMockField, createSetterProps, mockNode } from '../utils/mock'

// biome-ignore lint/suspicious/noEmptyBlockStatements: mock function
const noop = () => {}

export function TabSetterDemo() {
  const [stringValue, setStringValue] = useState('Tab 内容')
  const [numberValue, setNumberValue] = useState(100)
  const [colorValue, setColorValue] = useState('#ff0000')
  const [switchValue, setSwitchValue] = useState(false)

  return (
    <SetterDemo description='用于分组属性，支持多个标签页切换' title='TabSetter - 标签页容器'>
      <TabSetter
        field={createMockField({ id: 'tabs', title: '属性分组' })}
        initialValue='basic'
        onChange={noop}
        onInitial={noop}
        removeProp={noop}
        selected={mockNode}
        tabs={[
          { label: '基本', value: 'basic' },
          { label: '高级', value: 'advanced' },
        ]}
        value={undefined}
      >
        {/* 基本 Tab */}
        <div key='basic-tab' {...({ field: { config: { key: 'basic', title: '基本' } } } as Record<string, unknown>)}>
          <div className='space-y-3'>
            <div>
              <span className='mb-1 block text-muted-foreground text-xs'>文本</span>
              <StringSetter {...createSetterProps(stringValue, setStringValue)} />
            </div>
            <div>
              <span className='mb-1 block text-muted-foreground text-xs'>数值</span>
              <NumberSetter {...createSetterProps(numberValue, setNumberValue)} suffix='px' />
            </div>
          </div>
        </div>
        {/* 高级 Tab */}
        <div
          key='advanced-tab'
          {...({ field: { config: { key: 'advanced', title: '高级' } } } as Record<string, unknown>)}
        >
          <div className='space-y-3'>
            <div>
              <span className='mb-1 block text-muted-foreground text-xs'>颜色</span>
              <ColorSetter {...createSetterProps(colorValue, setColorValue)} />
            </div>
            <div>
              <span className='mb-1 block text-muted-foreground text-xs'>开关</span>
              <SwitchSetter {...createSetterProps(switchValue, setSwitchValue)} />
            </div>
          </div>
        </div>
      </TabSetter>
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'TabSetter',
  slug: 'tab-setter',
  group: 'group' as const,
  order: 2,
  description: '标签页分组容器',
}

export default TabSetterDemo
