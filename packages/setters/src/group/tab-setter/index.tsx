import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

export interface TabSetterProps extends SetterProps<string>, PropsWithChildren {
  tabs?: {
    label: string
    value: string
  }[]
}

const TabSetter = (props: TabSetterProps) => {
  const { tabs, initialValue, children } = props
  const tabsListRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

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

  const updateIndicator = useCallback(() => {
    if (!tabsListRef.current) {
      return
    }
    const selectedButton = tabsListRef.current.querySelector(`[data-value="${activeTab}"]`) as HTMLButtonElement
    if (selectedButton) {
      const containerRect = tabsListRef.current.getBoundingClientRect()
      const buttonRect = selectedButton.getBoundingClientRect()
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      })
    }
  }, [activeTab])

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  return (
    <div className={styles.container}>
      <div
        className={styles.tabsList}
        ref={tabsListRef}
        role='tablist'
        style={{
          gridTemplateColumns: `repeat(${tabsList.length}, minmax(0, 1fr))`,
        }}
      >
        <div
          className={styles.indicator}
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: `${indicatorStyle.width}px`,
          }}
        />
        {tabsList.map(tab => (
          <button
            aria-selected={activeTab === tab.value}
            className={cn(styles.tabTrigger, activeTab === tab.value ? styles.tabTriggerActive : '')}
            data-value={tab.value}
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
