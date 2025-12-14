import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import type { SetterProps } from '@easy-editor/core'
import type { PropsWithChildren } from 'react'
import React from 'react'

export interface TabSetterProps extends SetterProps<string>, PropsWithChildren {
  tabs?: {
    label: string
    value: string
  }[]
}

const TabSetter = (props: TabSetterProps) => {
  const { tabs, initialValue, children } = props

  const tabsList = React.useMemo(() => {
    if (tabs) return tabs
    if (Array.isArray(children) && children.length > 0) {
      return children.map(child => ({
        label: child.props.field.config.title,
        value: child.props.field.config.key,
      }))
    }
    throw new Error('TabSetter: children or tabs must be an array')
  }, [tabs, children])
  const firstTabValue = React.useMemo(() => tabsList[0]?.value, [tabsList])

  return (
    <Tabs className='w-full' defaultValue={initialValue ?? firstTabValue}>
      <TabsList
        className='grid w-full'
        style={{
          gridTemplateColumns: `repeat(${tabsList.length}, minmax(0, 1fr))`,
        }}
      >
        {tabsList.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* INFO：两种 group 的渲染方式，一种是 field.items，一种是 children */}
      {Array.isArray(children) &&
        children.map(child => (
          <TabsContent
            className='mt-0 box-border space-y-3 p-2'
            key={child.props.field.config.key}
            value={child.props.field.config.key}
          >
            {child}
          </TabsContent>
        ))}
    </Tabs>
  )
}

export default TabSetter
