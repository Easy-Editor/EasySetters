/**
 * ArraySetter Demo
 */
import { useState } from 'react'
import { ArraySetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function ArraySetterDemo() {
  const [value, setValue] = useState(['项目一', '项目二', '项目三'])
  return (
    <SetterDemo currentValue={value} description='用于编辑字符串数组' title='ArraySetter - 数组编辑'>
      <ArraySetter {...createSetterProps(value, setValue, { id: 'array', title: '列表项' })} placeholder='输入新项目' />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'ArraySetter',
  slug: 'array-setter',
  group: 'basic' as const,
  order: 13,
  description: '数组编辑设置器',
}

export default ArraySetterDemo
