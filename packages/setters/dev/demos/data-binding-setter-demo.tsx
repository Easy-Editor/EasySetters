/**
 * DataBindingSetter Demo
 */
import { useState } from 'react'
import { DataBindingSetter } from '../../src'
import type { DataBindingValue } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function DataBindingSetterDemo() {
  const [value, setValue] = useState<DataBindingValue>({
    type: 'static',
    value: '静态文本',
  })

  return (
    <SetterDemo
      currentValue={value}
      description='用于配置数据绑定（静态值或动态表达式）'
      title='DataBindingSetter - 数据绑定'
    >
      <DataBindingSetter
        {...createSetterProps(value, setValue, { id: 'binding', title: '数据源' })}
        dataFields={['user.name', 'user.email', 'product.title', 'product.price']}
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'DataBindingSetter',
  slug: 'data-binding-setter',
  group: 'basic' as const,
  order: 21,
  description: '数据绑定设置器',
}

export default DataBindingSetterDemo
