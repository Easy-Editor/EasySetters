/**
 * TextAreaSetter Demo
 */
import { useState } from 'react'
import { TextAreaSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function TextAreaSetterDemo() {
  const [value, setValue] = useState('这是一段多行文本内容...')
  return (
    <SetterDemo currentValue={value} description='用于输入多行文本内容' title='TextAreaSetter - 多行文本'>
      <TextAreaSetter
        {...createSetterProps(value, setValue, { id: 'textarea', title: '描述' })}
        placeholder='请输入描述内容'
        rows={4}
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'TextAreaSetter',
  slug: 'textarea-setter',
  group: 'basic' as const,
  order: 12,
  description: '多行文本设置器',
}

export default TextAreaSetterDemo
