/**
 * EasySetters 测试页面
 * 用于本地开发和测试所有设置器组件
 */

import './type'
import { useState } from 'react'
import {
  StringSetter,
  NumberSetter,
  ColorSetter,
  SwitchSetter,
  RectSetter,
  NodeIdSetter,
  UploadSetter,
  CollapseSetter,
  TabSetter,
  customFieldItem,
} from '../src'
import { ThemeProvider } from './theme-provider'
import { ModeToggle } from './mode-toggle'

// 模拟 SettingField 对象
const createMockField = (
  id: string,
  title: string,
  extraProps: Record<string, unknown> = {},
  config: Record<string, unknown> = {},
) => ({
  id,
  title,
  config: {
    key: id,
    title,
    extraProps: {
      label: true,
      ...extraProps,
    },
    ...config,
  },
})

// 模拟 Node 对象
const mockNode = {
  id: 'mock-node-001',
  componentName: 'TestComponent',
  componentMeta: {
    title: '测试组件',
    componentName: 'TestComponent',
  },
}

function SetterDemo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='rounded-lg border bg-card p-4'>
      <h3 className='mb-3 font-medium text-foreground text-sm'>{title}</h3>
      <div className='space-y-2'>{children}</div>
    </div>
  )
}

function AppContent() {
  // 各设置器的状态
  const [stringValue, setStringValue] = useState('Hello World')
  const [numberValue, setNumberValue] = useState(100)
  const [colorValue, setColorValue] = useState('#3b82f6')
  const [switchValue, setSwitchValue] = useState(true)
  const [rectValue, setRectValue] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 100,
  })
  const [uploadValue, setUploadValue] = useState<{ url: string; name: string } | null>(null)

  // 模拟 setter props
  const createSetterProps = <T,>(value: T, onChange: (v: T) => void) => ({
    value,
    onChange,
    initialValue: value,
    field: createMockField('test', 'Test'),
    selected: mockNode,
    onInitial: () => {},
    removeProp: () => {},
  })

  return (
    <div className='min-h-screen bg-background p-8 transition-colors'>
      <div className='mx-auto max-w-4xl'>
        <header className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='font-bold text-2xl text-foreground'>EasySetters 测试页面</h1>
            <p className='mt-2 text-muted-foreground'>本地开发和测试所有设置器组件</p>
          </div>
          <ModeToggle />
        </header>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* StringSetter */}
          <SetterDemo title='StringSetter - 字符串输入'>
            {customFieldItem(
              createMockField('string', '文本内容'),
              <StringSetter {...createSetterProps(stringValue, setStringValue)} placeholder='请输入文本' />,
            )}
            <div className='mt-2 text-muted-foreground text-xs'>当前值: {stringValue}</div>
          </SetterDemo>

          {/* NumberSetter */}
          <SetterDemo title='NumberSetter - 数字输入'>
            {customFieldItem(
              createMockField('number', '数值'),
              <NumberSetter {...createSetterProps(numberValue, setNumberValue)} suffix='px' />,
            )}
            <div className='mt-2 text-muted-foreground text-xs'>当前值: {numberValue}</div>
          </SetterDemo>

          {/* ColorSetter */}
          <SetterDemo title='ColorSetter - 颜色选择'>
            {customFieldItem(
              createMockField('color', '颜色'),
              <ColorSetter {...createSetterProps(colorValue, setColorValue)} />,
            )}
            <div className='mt-2 text-muted-foreground text-xs'>当前值: {colorValue}</div>
          </SetterDemo>

          {/* SwitchSetter */}
          <SetterDemo title='SwitchSetter - 开关'>
            {customFieldItem(
              createMockField('switch', '启用'),
              <SwitchSetter {...createSetterProps(switchValue, setSwitchValue)} />,
            )}
            <div className='mt-2 text-muted-foreground text-xs'>当前值: {switchValue ? '开启' : '关闭'}</div>
          </SetterDemo>

          {/* NodeIdSetter */}
          <SetterDemo title='NodeIdSetter - 节点 ID（只读）'>
            {customFieldItem(
              createMockField('nodeId', '节点 ID', { label: false }),
              <NodeIdSetter {...createSetterProps('mock-node-001', () => {})} />,
            )}
          </SetterDemo>

          {/* UploadSetter */}
          <SetterDemo title='UploadSetter - 文件上传'>
            {customFieldItem(
              createMockField('upload', '图片'),
              <UploadSetter {...createSetterProps(uploadValue, setUploadValue)} />,
            )}
            <div className='mt-2 text-muted-foreground text-xs'>
              当前值: {uploadValue ? uploadValue.name : '未上传'}
            </div>
          </SetterDemo>

          {/* RectSetter */}
          <SetterDemo title='RectSetter - 矩形编辑'>
            <div className='col-span-2'>
              {customFieldItem(
                createMockField('rect', '位置尺寸', { wrap: true }),
                <RectSetter {...createSetterProps(rectValue, setRectValue)} />,
              )}
              <div className='mt-2 text-muted-foreground text-xs'>
                当前值: x={rectValue.x}, y={rectValue.y}, w={rectValue.width}, h=
                {rectValue.height}
              </div>
            </div>
          </SetterDemo>
        </div>

        {/* 分组设置器 */}
        <div className='mt-8'>
          <h2 className='mb-4 font-semibold text-foreground text-lg'>分组设置器</h2>

          <div className='space-y-4'>
            {/* CollapseSetter */}
            <SetterDemo title='CollapseSetter - 可折叠容器'>
              <CollapseSetter
                field={createMockField('collapse', '基础属性')}
                icon={true}
                initialValue={true}
                onChange={() => {}}
                onInitial={() => {}}
                removeProp={() => {}}
                selected={mockNode}
                value={undefined}
              >
                {customFieldItem(
                  createMockField('inner1', '内部属性1'),
                  <StringSetter {...createSetterProps('内部值1', () => {})} />,
                )}
                {customFieldItem(
                  createMockField('inner2', '内部属性2'),
                  <NumberSetter {...createSetterProps(50, () => {})} suffix='px' />,
                )}
              </CollapseSetter>
            </SetterDemo>

            {/* TabSetter */}
            <SetterDemo title='TabSetter - 标签页容器'>
              <TabSetter
                field={createMockField('tabs', '属性分组')}
                initialValue='basic'
                onChange={() => {}}
                onInitial={() => {}}
                removeProp={() => {}}
                selected={mockNode}
                tabs={[
                  { label: '基本', value: 'basic' },
                  { label: '高级', value: 'advanced' },
                ]}
                value={undefined}
              >
                {/* 基本 Tab */}
                <div key='basic-tab' {...{ field: { config: { key: 'basic', title: '基本' } } }}>
                  <div className='space-y-3'>
                    {customFieldItem(
                      createMockField('tab-string', '文本'),
                      <StringSetter {...createSetterProps('Tab 内容', () => {})} />,
                    )}
                    {customFieldItem(
                      createMockField('tab-number', '数值'),
                      <NumberSetter {...createSetterProps(100, () => {})} suffix='px' />,
                    )}
                  </div>
                </div>
                {/* 高级 Tab */}
                <div key='advanced-tab' {...{ field: { config: { key: 'advanced', title: '高级' } } }}>
                  <div className='space-y-3'>
                    {customFieldItem(
                      createMockField('tab-color', '颜色'),
                      <ColorSetter {...createSetterProps('#ff0000', () => {})} />,
                    )}
                    {customFieldItem(
                      createMockField('tab-switch', '开关'),
                      <SwitchSetter {...createSetterProps(false, () => {})} />,
                    )}
                  </div>
                </div>
              </TabSetter>
            </SetterDemo>
          </div>
        </div>

        {/* 状态汇总 */}
        <div className='mt-8 rounded-lg bg-muted p-4'>
          <h2 className='mb-2 font-semibold text-foreground text-lg'>状态汇总</h2>
          <pre className='overflow-auto text-muted-foreground text-xs'>
            {JSON.stringify(
              {
                stringValue,
                numberValue,
                colorValue,
                switchValue,
                rectValue,
                uploadValue,
              },
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='easy-setters-theme'>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
