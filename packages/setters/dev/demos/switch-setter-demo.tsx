/**
 * SwitchSetter Demo
 */
import { useState } from 'react'
import { SwitchSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function SwitchSetterDemo() {
  const [value, setValue] = useState(true)
  return (
    <SetterDemo currentValue={value ? '开启' : '关闭'} description='用于切换布尔值' title='SwitchSetter - 开关'>
      <SwitchSetter {...createSetterProps(value, setValue, { id: 'switch', title: '启用' })} />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'SwitchSetter',
  slug: 'switch-setter',
  group: 'basic' as const,
  order: 4,
  description: '开关设置器',
}

export default SwitchSetterDemo
