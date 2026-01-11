/**
 * CollapseSetter Demo
 */
import { useState } from 'react'
import { CollapseSetter, NumberSetter, StringSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createMockField, createSetterProps, mockNode } from '../utils/mock'

// biome-ignore lint/suspicious/noEmptyBlockStatements: mock function
const noop = () => {}

export function CollapseSetterDemo() {
  const [stringValue, setStringValue] = useState('内部值')
  const [numberValue, setNumberValue] = useState(50)

  return (
    <SetterDemo description='用于分组属性，支持展开/折叠' title='CollapseSetter - 可折叠容器'>
      <CollapseSetter
        field={createMockField({ id: 'collapse', title: '基础属性' })}
        icon={true}
        initialValue={true}
        onChange={noop}
        onInitial={noop}
        removeProp={noop}
        selected={mockNode}
        value={undefined}
      >
        <div className='space-y-3'>
          <div>
            <span className='mb-1 block text-muted-foreground text-xs'>内部属性1</span>
            <StringSetter {...createSetterProps(stringValue, setStringValue)} />
          </div>
          <div>
            <span className='mb-1 block text-muted-foreground text-xs'>内部属性2</span>
            <NumberSetter {...createSetterProps(numberValue, setNumberValue)} suffix='px' />
          </div>
        </div>
      </CollapseSetter>
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'CollapseSetter',
  slug: 'collapse-setter',
  group: 'group' as const,
  order: 1,
  description: '可折叠分组容器',
}

export default CollapseSetterDemo
