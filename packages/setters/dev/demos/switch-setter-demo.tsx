/**
 * SwitchSetter Demo
 */
import { useState } from 'react'
import { SwitchSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function SwitchSetterDemo() {
  const [switchValue, setSwitchValue] = useState(true)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [segmentedValue, setSegmentedValue] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SetterDemo currentValue={switchValue} description='开关模式（默认）' title='BoolSetter - 开关模式'>
        <SwitchSetter
          {...createSetterProps(switchValue, setSwitchValue, { id: 'switch', title: '开关' })}
          mode='switch'
        />
      </SetterDemo>

      <SetterDemo currentValue={checkboxValue} description='复选框模式' title='BoolSetter - 复选框模式'>
        <SwitchSetter
          {...createSetterProps(checkboxValue, setCheckboxValue, { id: 'checkbox', title: '复选框' })}
          mode='checkbox'
        />
      </SetterDemo>

      <SetterDemo currentValue={segmentedValue} description='分段模式，可自定义标签' title='BoolSetter - 分段模式'>
        <SwitchSetter
          {...createSetterProps(segmentedValue, setSegmentedValue, { id: 'segmented', title: '分段' })}
          falseLabel='禁用'
          mode='segmented'
          trueLabel='启用'
        />
      </SetterDemo>
    </div>
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
