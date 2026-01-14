/**
 * SliderSetter Demo
 */
import { useState } from 'react'
import { SliderSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function SliderSetterDemo() {
  const [value, setValue] = useState(50)
  return (
    <SetterDemo currentValue={value} description='用于在指定范围内选择数值' title='SliderSetter - 滑块选择'>
      <SliderSetter
        {...createSetterProps(value, setValue, { id: 'slider', title: '数值' })}
        max={100}
        min={0}
        step={1}
        suffix='%'
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'SliderSetter',
  slug: 'slider-setter',
  group: 'basic' as const,
  order: 11,
  description: '滑块选择设置器',
}

export default SliderSetterDemo
