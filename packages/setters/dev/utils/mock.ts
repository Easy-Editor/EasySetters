/**
 * 模拟 SettingField 和 Node 对象
 * 用于 dev 环境测试 setter 组件
 */

// biome-ignore lint/suspicious/noEmptyBlockStatements: mock function
const noop = () => {}

export interface MockFieldOptions {
  id: string
  title: string
  extraProps?: Record<string, unknown>
}

export function createMockField(options: MockFieldOptions) {
  const { id, title, extraProps = {} } = options
  return {
    id,
    title,
    config: {
      key: id,
      title,
      extraProps: { label: true, ...extraProps },
    },
  }
}

export const mockNode = {
  id: 'mock-node-001',
  componentName: 'TestComponent',
  componentMeta: {
    title: '测试组件',
    componentName: 'TestComponent',
  },
}

export function createSetterProps<T>(
  value: T,
  onChange: (v: T) => void,
  fieldOptions: MockFieldOptions = { id: 'test', title: 'Test' },
) {
  return {
    value,
    onChange,
    initialValue: value,
    field: createMockField(fieldOptions),
    selected: mockNode,
    onInitial: noop,
    removeProp: noop,
  }
}
