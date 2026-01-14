/**
 * JsonSetter Demo
 */
import { useState } from 'react'
import { JsonSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function JsonSetterDemo() {
  const [value, setValue] = useState({
    name: '示例数据',
    count: 100,
    enabled: true,
    items: ['a', 'b', 'c'],
  })
  return (
    <SetterDemo currentValue={value} description='用于编辑 JSON 数据' title='JsonSetter - JSON 编辑'>
      <JsonSetter {...createSetterProps(value, setValue, { id: 'json', title: 'JSON 数据' })} rows={8} />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'JsonSetter',
  slug: 'json-setter',
  group: 'basic' as const,
  order: 14,
  description: 'JSON 编辑设置器',
}

export default JsonSetterDemo
