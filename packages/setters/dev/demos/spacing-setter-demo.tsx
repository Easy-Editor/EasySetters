/**
 * SpacingSetter Demo
 */
import { useState } from 'react'
import { SpacingSetter } from '../../src'
import type { SpacingValue } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function SpacingSetterDemo() {
  const [value, setValue] = useState<SpacingValue>({
    top: 16,
    right: 24,
    bottom: 16,
    left: 24,
  })

  return (
    <SetterDemo currentValue={value} description='用于配置四边间距（padding/margin）' title='SpacingSetter - 间距设置'>
      <SpacingSetter {...createSetterProps(value, setValue, { id: 'spacing', title: '内边距' })} />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'SpacingSetter',
  slug: 'spacing-setter',
  group: 'basic' as const,
  order: 18,
  description: '间距设置器',
}

export default SpacingSetterDemo
