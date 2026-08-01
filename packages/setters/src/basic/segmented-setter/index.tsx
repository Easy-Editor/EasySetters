/**
 * SegmentedSetter - 分段控制器
 * 用于在多个选项之间切换，类似于 iOS 的 UISegmentedControl
 */
import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

export type SegmentedOptionValue = string | number | boolean

export interface SegmentedOption<T extends SegmentedOptionValue = SegmentedOptionValue> {
  label: string
  value: T
  disabled?: boolean
}

export interface SegmentedSetterProps<T extends SegmentedOptionValue = SegmentedOptionValue> extends SetterProps<T> {
  options?: SegmentedOption<T>[]
  size?: 'sm' | 'md'
}

const SegmentedSetter = <T extends SegmentedOptionValue>(props: SegmentedSetterProps<T>) => {
  const { value, initialValue, options = [], onChange, size = 'md' } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const currentValue = value ?? initialValue ?? options[0]?.value

  const updateIndicator = useCallback((_selectedValue: T | undefined) => {
    if (!containerRef.current) {
      return
    }
    const selectedButton = containerRef.current.querySelector('[data-selected="true"]') as HTMLButtonElement
    if (selectedButton) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const buttonRect = selectedButton.getBoundingClientRect()
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      })
    }
  }, [])

  useEffect(() => {
    updateIndicator(currentValue)
    const handleResize = () => updateIndicator(currentValue)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentValue, updateIndicator])

  return (
    <div className={cn(styles.container, size === 'sm' && styles.containerSm)} ref={containerRef}>
      <div
        className={styles.indicator}
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width}px`,
        }}
      />
      {options.map(option => (
        <button
          className={cn(
            styles.segment,
            currentValue === option.value && styles.segmentSelected,
            option.disabled === true && styles.segmentDisabled,
          )}
          data-selected={currentValue === option.value}
          disabled={option.disabled}
          key={`${typeof option.value}:${String(option.value)}`}
          onClick={() => !option.disabled && onChange(option.value)}
          type='button'
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default SegmentedSetter
