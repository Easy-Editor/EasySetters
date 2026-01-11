/**
 * StringSetter Demo
 */
import { useState } from 'react'
import { StringSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function StringSetterDemo() {
  const [value, setValue] = useState('Hello World')
  return (
    <SetterDemo
      currentValue={value}
      description='用于输入单行文本，支持 placeholder 和 suffix'
      title='StringSetter - 字符串输入'
    >
      <StringSetter
        {...createSetterProps(value, setValue, { id: 'string', title: '文本内容' })}
        placeholder='请输入文本'
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'StringSetter',
  slug: 'string-setter',
  group: 'basic' as const,
  order: 1,
  description: '字符串输入设置器',
}

export default StringSetterDemo
