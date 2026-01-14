/**
 * IconSetter Demo
 */
import { useState } from 'react'
import { IconSetter } from '../../src'
import type { IconValue } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function IconSetterDemo() {
  const [value, setValue] = useState<IconValue>({
    name: 'Star',
  })

  return (
    <SetterDemo currentValue={value} description='用于选择图标' title='IconSetter - 图标选择'>
      <IconSetter {...createSetterProps(value, setValue, { id: 'icon', title: '图标' })} />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'IconSetter',
  slug: 'icon-setter',
  group: 'basic' as const,
  order: 20,
  description: '图标选择设置器',
}

export default IconSetterDemo
