/**
 * ColorSetter Demo
 */
import { useState } from 'react'
import { ColorSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function ColorSetterDemo() {
  const [value, setValue] = useState('#3b82f6')
  return (
    <SetterDemo currentValue={value} description='用于选择颜色，支持透明度' title='ColorSetter - 颜色选择'>
      <ColorSetter {...createSetterProps(value, setValue, { id: 'color', title: '颜色' })} />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'ColorSetter',
  slug: 'color-setter',
  group: 'basic' as const,
  order: 3,
  description: '颜色选择设置器',
}

export default ColorSetterDemo
