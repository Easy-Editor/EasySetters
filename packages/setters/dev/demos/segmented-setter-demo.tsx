/**
 * SegmentedSetter Demo
 */
import { useState } from 'react'
import { SegmentedSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function SegmentedSetterDemo() {
  const [value, setValue] = useState('center')
  const [sizeValue, setSizeValue] = useState('md')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SetterDemo currentValue={value} description='用于在多个选项之间快速切换' title='SegmentedSetter - 分段控制器'>
        <SegmentedSetter
          {...createSetterProps(value, setValue, { id: 'align', title: '对齐' })}
          options={[
            { label: '左对齐', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '右对齐', value: 'right' },
          ]}
        />
      </SetterDemo>

      <SetterDemo currentValue={sizeValue} description='小尺寸模式' title='SegmentedSetter - 小尺寸'>
        <SegmentedSetter
          {...createSetterProps(sizeValue, setSizeValue, { id: 'size', title: '尺寸' })}
          options={[
            { label: 'S', value: 'sm' },
            { label: 'M', value: 'md' },
            { label: 'L', value: 'lg' },
            { label: 'XL', value: 'xl' },
          ]}
          size='sm'
        />
      </SetterDemo>
    </div>
  )
}

export const demoMeta = {
  name: 'SegmentedSetter',
  slug: 'segmented-setter',
  group: 'basic' as const,
  order: 24,
  description: '分段控制器设置器',
}

export default SegmentedSetterDemo
