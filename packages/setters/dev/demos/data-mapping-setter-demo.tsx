/**
 * DataMappingSetter Demo
 */
import { useState } from 'react'
import { DataMappingSetter } from '../../src'
import type { DataMappingValue } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

export function DataMappingSetterDemo() {
  const [value, setValue] = useState<DataMappingValue>({
    mappings: [
      { targetField: 'title', sourceField: 'data.name' },
      { targetField: 'count', sourceField: 'data.total', transform: 'value * 100' },
    ],
  })

  return (
    <SetterDemo currentValue={value} description='用于配置数据字段映射关系' title='DataMappingSetter - 数据映射'>
      <DataMappingSetter
        {...createSetterProps(value, setValue, { id: 'mapping', title: '字段映射' })}
        sourceFields={['data.name', 'data.total', 'data.list', 'data.status']}
        targetFields={[
          { name: 'title', label: '标题', type: 'string', required: true },
          { name: 'count', label: '数量', type: 'number' },
          { name: 'items', label: '列表', type: 'array' },
        ]}
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'DataMappingSetter',
  slug: 'data-mapping-setter',
  group: 'basic' as const,
  order: 22,
  description: '数据映射设置器',
}

export default DataMappingSetterDemo
