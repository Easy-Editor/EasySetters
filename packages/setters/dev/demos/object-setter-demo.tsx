/**
 * ObjectSetter Demo
 */
import { useState } from 'react'
import { ObjectSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function ObjectSetterDemo() {
  const [value, setValue] = useState({
    title: '标题文本',
    count: 10,
    visible: true,
  })
  return (
    <SetterDemo currentValue={value} description='用于编辑结构化对象数据' title='ObjectSetter - 对象编辑'>
      <ObjectSetter
        {...createSetterProps(value, setValue, { id: 'object', title: '配置对象' })}
        fields={[
          { key: 'title', label: '标题', type: 'string' },
          { key: 'count', label: '数量', type: 'number' },
          { key: 'visible', label: '可见', type: 'boolean' },
        ]}
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'ObjectSetter',
  slug: 'object-setter',
  group: 'basic' as const,
  order: 15,
  description: '对象编辑设置器',
}

export default ObjectSetterDemo
