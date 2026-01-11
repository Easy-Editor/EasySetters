/**
 * NumberSetter Demo
 */
import { useState } from 'react'
import { NumberSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function NumberSetterDemo() {
  const [value, setValue] = useState(100)
  return (
    <SetterDemo currentValue={value} description='用于输入数字，支持 suffix 后缀' title='NumberSetter - 数字输入'>
      <NumberSetter {...createSetterProps(value, setValue, { id: 'number', title: '数值' })} suffix='px' />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'NumberSetter',
  slug: 'number-setter',
  group: 'basic' as const,
  order: 2,
  description: '数字输入设置器',
}

export default NumberSetterDemo
