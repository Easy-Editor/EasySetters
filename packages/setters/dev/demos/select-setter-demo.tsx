/**
 * SelectSetter Demo
 */
import { useState } from 'react'
import { SelectSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function SelectSetterDemo() {
  const [value, setValue] = useState('option1')
  return (
    <SetterDemo currentValue={value} description='用于从预设选项中选择一个值' title='SelectSetter - 下拉选择'>
      <SelectSetter
        {...createSetterProps(value, setValue, { id: 'select', title: '选择项' })}
        options={[
          { label: '选项一', value: 'option1' },
          { label: '选项二', value: 'option2' },
          { label: '选项三', value: 'option3' },
          { label: '禁用选项', value: 'disabled', disabled: true },
        ]}
        placeholder='请选择'
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'SelectSetter',
  slug: 'select-setter',
  group: 'basic' as const,
  order: 10,
  description: '下拉选择设置器',
}

export default SelectSetterDemo
