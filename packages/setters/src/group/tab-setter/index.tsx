import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import styles from './styles.module.css'

export interface TabSetterProps extends SetterProps<string>, PropsWithChildren {
  tabs?: {
    label: string
    value: string
  }[]
}

const TabSetter = (props: TabSetterProps) => {
  const { tabs, initialValue, children } = props

  const tabsList = React.useMemo(() => {
    if (tabs) {
      return tabs
    }
    if (Array.isArray(children) && children.length > 0) {
      return children.map(child => ({
        label: child.props.field.config.title,
        value: child.props.field.config.key,
      }))
    }
    throw new Error('TabSetter: children or tabs must be an array')
  }, [tabs, children])

  const firstTabValue = React.useMemo(() => tabsList[0]?.value, [tabsList])
  const [activeTab, setActiveTab] = useState(initialValue ?? firstTabValue)

  return (
    <div className={styles.container}>
      <div
        className={styles.tabsList}
        role='tablist'
        style={{
          gridTemplateColumns: `repeat(${tabsList.length}, minmax(0, 1fr))`,
        }}
      >
        {tabsList.map(tab => (
          <button
            aria-selected={activeTab === tab.value}
            className={cn(styles.tabTrigger, activeTab === tab.value ? styles.tabTriggerActive : '')}
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            role='tab'
            type='button'
          >
            {tab.label}
          </button>
        ))}
      </div>
      {Array.isArray(children)
        ? children.map(child => (
            <div
              className={cn(
                styles.tabContent,
                activeTab === child.props.field.config.key ? styles.tabContentActive : '',
              )}
              key={child.props.field.config.key}
              role='tabpanel'
            >
              {child}
            </div>
          ))
        : null}
    </div>
  )
}

export default TabSetter
