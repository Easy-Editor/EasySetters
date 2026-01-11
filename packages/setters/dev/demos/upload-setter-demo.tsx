/**
 * UploadSetter Demo
 */
import { useState } from 'react'
import { UploadSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function UploadSetterDemo() {
  const [value, setValue] = useState<{ url: string; name: string } | null>(null)
  return (
    <SetterDemo
      currentValue={value ? value.name : '未上传'}
      description='用于上传文件，支持图片预览'
      title='UploadSetter - 文件上传'
    >
      <UploadSetter {...createSetterProps(value, setValue, { id: 'upload', title: '图片' })} />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'UploadSetter',
  slug: 'upload-setter',
  group: 'basic' as const,
  order: 6,
  description: '文件上传设置器',
}

export default UploadSetterDemo
