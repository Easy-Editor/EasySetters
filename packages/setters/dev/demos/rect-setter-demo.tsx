/**
 * RectSetter Demo
 */
import { useState } from 'react'
import { RectSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function RectSetterDemo() {
  const [value, setValue] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 100,
  })
  return (
    <SetterDemo
      currentValue={value}
      description='用于编辑位置和尺寸 (X, Y, Width, Height)'
      title='RectSetter - 矩形编辑'
    >
      <RectSetter
        {...createSetterProps(value, setValue, { id: 'rect', title: '位置尺寸', extraProps: { wrap: true } })}
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'RectSetter',
  slug: 'rect-setter',
  group: 'basic' as const,
  order: 7,
  description: '矩形位置尺寸设置器',
}

export default RectSetterDemo
