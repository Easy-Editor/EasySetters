/**
 * AlignSetter Demo
 */
import { useState } from 'react'
import { AlignSetter } from '../../src'
import type { AlignValue } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function AlignSetterDemo() {
  const [value, setValue] = useState<AlignValue>({
    horizontal: 'center',
    vertical: 'center',
  })

  return (
    <SetterDemo currentValue={value} description='用于配置水平和垂直对齐方式' title='AlignSetter - 对齐设置'>
      <AlignSetter {...createSetterProps(value, setValue, { id: 'align', title: '对齐' })} />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'AlignSetter',
  slug: 'align-setter',
  group: 'basic' as const,
  order: 19,
  description: '对齐设置器',
}

export default AlignSetterDemo
