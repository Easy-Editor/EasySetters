/**
 * NodeIdSetter Demo
 */
import { NodeIdSetter } from '../../src'
import { SetterDemo } from '../components/setter-demo'
import { createSetterProps } from '../utils/mock'

// biome-ignore lint/suspicious/noEmptyBlockStatements: mock function
const noop = () => {}

export function NodeIdSetterDemo() {
  return (
    <SetterDemo description='只读显示节点 ID' title='NodeIdSetter - 节点 ID'>
      <NodeIdSetter
        {...createSetterProps('mock-node-001', noop, {
          id: 'nodeId',
          title: '节点 ID',
          extraProps: { label: false },
        })}
      />
    </SetterDemo>
  )
}

export const demoMeta = {
  name: 'NodeIdSetter',
  slug: 'node-id-setter',
  group: 'basic' as const,
  order: 5,
  description: '节点 ID 显示（只读）',
}

export default NodeIdSetterDemo
